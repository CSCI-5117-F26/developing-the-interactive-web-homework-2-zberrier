import type { Actions, PageLoad } from './$types';
import { fail } from '@sveltejs/kit';
import * as db from '#lib/server/mongo.server.ts';

export const load: PageLoad = async ({parent}) => {
    const {todos} = await parent();
    return {todos};
}

export const actions = {
    create: async({request}) => {
        const formData = await request.formData();
        const item = String(formData.get('item')).trim();
        if (item == '') {
            return fail(400, {item, missing: true})
        }

        db.createTask(item);
    }
} satisfies Actions;
