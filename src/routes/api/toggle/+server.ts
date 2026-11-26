import * as db from '#lib/server/mongo.server.ts';
import { error } from '@sveltejs/kit';
import {auth} from '#lib/auth.js';


export async function PATCH({request}) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
        error(401, 'Not signed in');
    }

    const {id, complete} = await request.json();
    const toggle = await db.toggle(id, String(session.user.id), complete);

    if (!toggle) {
        console.log(id);
        error(404, 'ID not found');
    }

    return Response.json({
        success: toggle
    });
}
