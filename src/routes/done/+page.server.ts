import type { PageLoad } from './$types';

export const load: PageLoad = async ({parent}) => {
    const {todos} = await parent();
    return {todos};
}
