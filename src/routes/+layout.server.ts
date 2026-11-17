import * as todos from '#lib/server/data.ts';

export const ssr = false;

export function load() {
    const data = todos.getTodos();
    return {
        data
    };
}
