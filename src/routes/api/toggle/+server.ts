import * as db from '#lib/server/mongo.server.ts';
import { error } from '@sveltejs/kit';

export async function PATCH({request}) {
    const {id} = await request.json();

    const toggle = await db.toggle(id);
    if (!toggle) {
        error(404, 'Id not found');
    }

    return Response.json({
        success: toggle
    });
}
