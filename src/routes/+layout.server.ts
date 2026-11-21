import * as db from '#lib/server/mongo.server.ts';

export const ssr = false;

export async function load() {
    return {todos: await db.getTodos()};
}
