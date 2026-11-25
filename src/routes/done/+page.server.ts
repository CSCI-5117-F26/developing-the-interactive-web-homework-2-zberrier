import type { PageLoad } from './$types';
import * as db from '#lib/server/mongo.server.ts';

export const load: PageLoad = async ({parent}) => {
    const {userId, todos} = await parent();
    return {userId, todos, categories: await db.getCategories()};
}
