import * as todos from '#lib/server/data.js';
import { error } from '@sveltejs/kit';

export async function PATCH({request}) {
    const {id} = await request.json();
    const toggle = todos.toggle(id);
    if (!toggle) {
        error(404, 'Id not found');
    }
    return Response.json({
        success: toggle,
        id
    });
}
