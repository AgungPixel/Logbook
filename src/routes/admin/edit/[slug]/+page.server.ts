import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const article = await prisma.article.findUnique({
        where: { slug: params.slug }
    });
    
    if (!article) throw error(404, 'Article not found');
    
    return { article };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const data = await request.formData();
        
        const title = data.get('title') as string;
        const slug = data.get('slug') as string;
        const content = data.get('content') as string;
        const excerpt = data.get('excerpt') as string;
        const cover_image = data.get('cover_image') as string;
        const tagsStr = data.get('tags') as string;
        
        if (!title || !slug || !content) {
            return fail(400, { error: 'Missing required fields' });
        }
        
        const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];
        
        try {
            await prisma.article.update({
                where: { slug: params.slug },
                data: {
                    title,
                    slug,
                    content,
                    excerpt: excerpt || null,
                    cover_image: cover_image || null,
                    tags
                }
            });
        } catch (e) {
            return fail(500, { error: 'Failed to update article.' });
        }
        
        throw redirect(303, '/admin');
    }
};
