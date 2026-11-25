import type { Actions, PageLoad } from './$types';
import { fail } from '@sveltejs/kit';
import * as db from '#lib/server/mongo.server.ts';
import { auth } from '#lib/auth.ts';

export const load: PageLoad = async ({parent}) => {
    const {todos, userId} = await parent();
    return {todos, userId, categories: await db.getCategories()};
}

export const actions = {
    create: async({request}) => {
        const session = await auth.api.getSession({ headers: request.headers });
        const userId = String(session?.user.id)

        const formData = await request.formData();
        const item = String(formData.get('item') ?? '').trim();
        if (item == '') {
            return fail(400, {item, missing: true})
        }

        db.createTask(item, userId);
    }
} satisfies Actions;
