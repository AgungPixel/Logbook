import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const allArticles = await prisma.article.findMany({
		orderBy: { createdAt: 'desc' }
	});
    
	const categoryName = params.name.toLowerCase();
    const articles = allArticles.filter(article => {
        // Alias penanganan: Jika nama rute js, cocokkan dengan javascript (tags)
        const targetCategory = categoryName === 'js' ? 'javascript' : categoryName;
        // Cari setidaknya 1 tagar yang sesuai namanya secara loose
        return article.tags.some(tag => tag.toLowerCase() === targetCategory);
    });

	return { 
        articles,
        category: categoryName === 'js' ? 'Javascript' : params.name
    };
};
