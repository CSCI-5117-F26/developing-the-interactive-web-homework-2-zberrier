import type { Actions, PageLoad } from './$types';
import * as db from '#lib/server/mongo.server.ts';
import { auth } from '#lib/auth.ts';
import { fail } from '@sveltejs/kit';

export const load: PageLoad = async ({parent, params}) => {
    const {userId} = await parent();
    console.log(await db.getTodos(userId, params.category))

    return {userId, category: params.category, todos: await db.getTodos(userId, params.category)};
}

export const actions = {
    create: async({request, params}) => {
        const session = await auth.api.getSession({ headers: request.headers });
        const userId = String(session?.user.id)

        const formData = await request.formData();
        const item = String(formData.get('item') ?? '').trim();
        if (item == '') {
            return fail(400, {item, missing: true})
        }

        db.createTask(item, userId, params.category);
    }
} satisfies Actions;
