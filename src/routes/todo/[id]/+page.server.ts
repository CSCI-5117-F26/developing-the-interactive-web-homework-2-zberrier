import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as todos from '#lib/server/data.ts';

export function load({params}) {
    const data = todos.getTodoItem(Number(params.id));
    if (data == null) {
        error(404, 'Todo not found!');
    } 
    return data;
}

export const actions = {
    edit: async ({request}) => {
        const formData = await request.formData();
        console.log(formData);

        const id = Number(formData.get('id'));
        const task = String(formData.get('task')).trim();
        const complete = formData.get('complete') != null;

        if (task == '') {
            error(400, 'Cannot have empty task');
        }

        const res = todos.editTask(id, task, complete);
        if (res == false) {
            error(400, 'Bad input, cannot find task');
        }
    }
} satisfies Actions;
