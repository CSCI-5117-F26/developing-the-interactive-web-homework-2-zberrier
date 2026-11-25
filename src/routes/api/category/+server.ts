import * as db from '#lib/server/mongo.server.ts';
import { error } from '@sveltejs/kit';

export async function POST({request}) {
    const {newCategory} = await request.json();
    const res = await db.createCategory(newCategory);

    return Response.json({success: res})
}

export async function DELETE({request}) {
    const {category} = await request.json();
    const res = await db.deleteCategory(category);

    if (!res) {
        error(400, 'Bad input');
    }

    return Response.json({success: res});
}
