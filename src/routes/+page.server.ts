import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '#lib/auth.ts';

export const actions = {
    loginEmail: async ({request}) => {
        const formData = await request.formData();
        const name = String(formData.get('name') ?? '').trim();
        const email = String(formData.get('email') ?? '').trim();
        const password = String(formData.get('password') ?? '').trim();

        try {
            await auth.api.signUpEmail({
				body: {
                    name,
					email,
					password,
					callbackURL: '/todos'
				}
			});
        } catch {
            return fail(400, { message: 'Signup failed' });
        }
        return redirect(303, '/todos');
    },
    signinEmail: async ({request}) => {
        const formData = await request.formData();
        const email = String(formData.get('email') ?? '').trim();
        const password = String(formData.get('password') ?? '').trim();

        try {
            await auth.api.signInEmail({
				body: {
					email,
					password,
					callbackURL: '/todos'
				}
			});
        } catch {
            return fail(400, { message: 'Signin failed' });
        }
        return redirect(303, '/todos');
    }
} satisfies Actions;
