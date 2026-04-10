import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// If the user is unauthenticated and isn't on the login page...
	if (!locals.user && !url.pathname.endsWith('/login')) {
		throw redirect(303, '/admin/login');
	}
	
	// If the user IS authenticated and tries to go to login page...
	if (locals.user && url.pathname.endsWith('/login')) {
		throw redirect(303, '/admin');
	}
	
	return { user: locals.user };
};
