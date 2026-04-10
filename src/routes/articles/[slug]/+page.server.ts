import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const article = await prisma.article.findUnique({
		where: { slug: params.slug }
	});
    
    if (!article) {
        throw error(404, 'Article not found');
    }

	return { article };
};
