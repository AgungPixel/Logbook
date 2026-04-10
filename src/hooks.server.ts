import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token') || event.request.headers.get('authorization')?.split(' ')[1];

	if (token) {
		try {
			const secret = env.JWT_SECRET || 'super-secret-key-change-me';
			const payload = jwt.verify(token, secret) as { id: string; email: string };
			event.locals.user = payload;
		} catch (e) {
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
