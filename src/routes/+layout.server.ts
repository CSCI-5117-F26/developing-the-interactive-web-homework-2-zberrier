import { auth } from '#lib/auth.ts';
import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import * as db from '#lib/server/mongo.server.ts';

export const ssr = false;

export async function load({request, url}) {
    const session = await auth.api.getSession({ headers: request.headers });
    const user = session?.user ?? null;
    const userId = String(session?.user.id);

    if (url.pathname == '/') {
        if (session) {
            redirect(303, resolve('/todos'));
        }
    } else {
        if (!session) {
            redirect(303, resolve('/'));
        } else {
            return {user, todos: await db.getTodos(userId)};
        }
    }
}
