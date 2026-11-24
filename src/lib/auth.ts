import { betterAuth } from "better-auth";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "#lib/server/mongo.server.ts"; // your mongodb client

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
    plugins: [sveltekitCookies(getRequestEvent)] // make sure this is the last plugin in the array
});
