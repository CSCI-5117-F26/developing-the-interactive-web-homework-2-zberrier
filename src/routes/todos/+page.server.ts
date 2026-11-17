import type { Actions } from './$types';
import * as todos from '#lib/server/data.ts';

export async function load({parent}) {
    const data = await parent();
    return {
        data: data.data
    };
}

export const actions = {
    create: async({request}) => {
        const formData = await request.formData();
        const item = String(formData.get('item'));
        todos.createTask(item);
    }
} satisfies Actions;
