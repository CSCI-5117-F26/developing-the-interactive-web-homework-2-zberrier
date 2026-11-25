import type { PageLoad } from './$types';
import * as db from '#lib/server/mongo.server.ts';

export const load: PageLoad = async ({parent, params}) => {
    const {userId} = await parent();
    return {userId, category: params.category, todos: await db.getTodos(userId, params.category)};
}
