import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

// GET uses slug
export const GET: RequestHandler = async ({ params }) => {
	try {
		const article = await prisma.article.findUnique({
			where: { slug: params.identifier }
		});
		if (!article) return json({ error: 'Article not found' }, { status: 404 });
		return json(article);
	} catch (error) {
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};

export const PUT: RequestHandler = async ({ params, request, locals }) => {
	if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
	
	try {
		const data = await request.json();
		const article = await prisma.article.update({
			where: { id: params.identifier },
			data
		});
		return json(article);
	} catch (error) {
		return json({ error: 'Update failed' }, { status: 400 });
	}
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
	
	try {
		await prisma.article.delete({
			where: { id: params.identifier }
		});
		return json({ message: 'Article deleted successfully' });
	} catch (error) {
		return json({ error: 'Delete failed' }, { status: 400 });
	}
};
