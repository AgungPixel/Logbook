import { prisma } from '$lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const articles = await prisma.article.findMany({
		orderBy: { createdAt: 'desc' }
	});
	return { articles };
};

export const actions: Actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id') as string;
        
        if (!id) return fail(400, { error: 'Missing ID' });
        
        try {
            await prisma.article.delete({ where: { id } });
            return { success: true };
        } catch (e) {
            return fail(500, { error: 'Failed to delete' });
        }
    }
}
