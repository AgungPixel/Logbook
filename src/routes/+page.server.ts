import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const articles = await prisma.article.findMany({
		orderBy: { createdAt: 'desc' },
		take: 4 // Only get the latest 4 for homepage
	});
	return { articles };
};
