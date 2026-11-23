import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as db from '#lib/server/mongo.server.ts';

export async function load({params}) {
    const data = await db.getTodoItem(params.id);

    if (data == null) {
        error(404, 'Todo not found!');
    } 
    return data;
}

export const actions = {
    edit: async ({request}) => {
        const formData = await request.formData();

        const id = String(formData.get('id'));
        const task = String(formData.get('task') ?? '').trim();
        const complete = formData.get('complete') != null;

        if (task == '') {
            return fail(400, {task, missing: true});
        }

        const res = await db.editTask(id, task, complete);
        if (res == false) {
            error(400, 'Could not edit task');
        }
    }
} satisfies Actions;
