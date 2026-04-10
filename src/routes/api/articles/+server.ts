import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async () => {
	try {
		const articles = await prisma.article.findMany({
			orderBy: { createdAt: 'desc' }
		});
		return json(articles);
	} catch (error) {
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
	
	try {
		const data = await request.json();
		const article = await prisma.article.create({ data });
		return json(article, { status: 201 });
	} catch (error) {
		return json({ error: 'Validation failed' }, { status: 400 });
	}
};
