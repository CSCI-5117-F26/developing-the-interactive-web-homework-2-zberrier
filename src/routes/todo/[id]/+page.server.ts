import { error } from '@sveltejs/kit';
import * as todos from '#lib/server/data.ts';

export function load({params}) {
    const data = todos.getTodoItem(Number(params.id));
    if (data == null) {
        error(404, 'Todo not found!');
    } 
    return data;
}
