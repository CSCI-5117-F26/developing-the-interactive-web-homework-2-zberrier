import type { PageLoad } from './$types';
import { auth } from '#lib/auth.ts';

export const load: PageLoad = async ({parent, request}) => {
    const session = await auth.api.getSession({ headers: request.headers });
    const userId = String(session?.user.id);

    const {todos} = await parent();
    return {todos, userId};
}
