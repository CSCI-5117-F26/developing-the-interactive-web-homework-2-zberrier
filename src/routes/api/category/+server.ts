import * as db from '#lib/server/mongo.server.ts';
import { error } from '@sveltejs/kit';
import {auth} from '#lib/auth.js';

export async function POST({request}) {
    const session = await auth.api.getSession({ headers: request.headers });
    const userId = String(session?.user.id);

    const {newCategory} = await request.json();
    const res = await db.createCategory(newCategory, userId);

    return Response.json({success: res})
}

export async function DELETE({request}) {
    const session = await auth.api.getSession({ headers: request.headers });
    const userId = String(session?.user.id);

    const {category} = await request.json();
    const res = await db.deleteCategory(category, userId);

    if (!res) {
        error(400, 'Bad input');
    }

    return Response.json({success: res});
}
