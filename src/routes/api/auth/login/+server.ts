import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '$lib/server/prisma';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { email, password } = await request.json();
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return json({ error: 'Invalid credentials' }, { status: 401 });
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return json({ error: 'Invalid credentials' }, { status: 401 });
		}

		const secret = env.JWT_SECRET || 'super-secret-key-change-me';
		const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1d' });

		cookies.set('token', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		});

		return json({ token, user: { id: user.id, email: user.email } });
	} catch (error) {
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
