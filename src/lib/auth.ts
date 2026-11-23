import { betterAuth } from "better-auth";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "#lib/server/mongo.server.ts"; // your mongodb client
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from '$app/env/private';

export const auth = betterAuth({
    database: mongodbAdapter(client.db('todos'), { client }),
    emailAndPassword: { 
        enabled: true, 
    },
    advanced: {
        database: {
            joins: true,
        },
    },
    baseURL: BETTER_AUTH_URL,
    secret: BETTER_AUTH_SECRET,
    plugins: [sveltekitCookies(getRequestEvent)] // make sure this is the last plugin in the array
});
