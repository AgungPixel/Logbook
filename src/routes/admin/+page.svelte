<script lang="ts">
  import { enhance } from '$app/forms';
  let { data } = $props();

  function formatDate(d: Date) {
      if(!d) return '';
      return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
</script>

<svelte:head>
  <title>Admin Dashboard | agungm.</title>
</svelte:head>

<div class="max-w-5xl mt-16 mb-32 mx-auto px-6">
  <div class="flex justify-between items-end mb-12">
    <div>
      <h1 class="text-4xl font-bold tracking-tighter mb-2 text-white">Dashboard.</h1>
      <p class="text-text-secondary">Manage your content publication</p>
    </div>
    <a href="/admin/create" class="bg-white text-black font-semibold text-sm px-6 py-2 rounded-full hover:bg-accent transition-colors duration-300">
      + New Post
    </a>
  </div>

  <div class="border border-surface-200 rounded-lg overflow-hidden bg-surface-100/50 mb-8">
    <table class="w-full text-left">
      <thead>
        <tr class="border-b border-surface-200 text-xs text-text-secondary uppercase tracking-widest bg-surface-100">
          <th class="py-4 px-6 font-medium">Title</th>
          <th class="py-4 px-6 font-medium hidden md:table-cell">Status</th>
          <th class="py-4 px-6 font-medium">Date</th>
          <th class="py-4 px-6 font-medium text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each data.articles as article}
          <tr class="border-b border-surface-200/50 last:border-0 hover:bg-surface-200/50 transition-colors duration-250">
            <td class="py-4 px-6 font-medium tracking-tight text-white line-clamp-1 max-w-[150px] md:max-w-xs">{article.title}</td>
            <td class="py-4 px-6 text-sm text-text-secondary hidden md:table-cell">
              <span class="px-2 py-1 bg-surface-200 text-white rounded text-xs">Published</span>
            </td>
            <td class="py-4 px-6 text-sm text-text-secondary font-mono">{formatDate(article.createdAt)}</td>
            <td class="py-4 px-6 text-right flex justify-end gap-x-6 items-center">
              <a href={`/admin/edit/${article.slug}`} class="text-sm font-semibold text-text-secondary hover:text-accent transition-colors cursor-pointer block mt-1">Edit</a>
              <form method="POST" action="?/delete" use:enhance onsubmit={() => confirm('Are you absolutely sure you want to permanently delete this article?')}>
                <input type="hidden" name="id" value={article.id} />
                <button type="submit" class="text-sm font-semibold text-red-500 hover:text-red-400 transition-colors flex mt-1">Delete</button>
              </form>
            </td>
          </tr>
        {/each}
        {#if data.articles.length === 0}
          <tr>
            <td colspan="4" class="py-12 text-center text-text-secondary">No articles found. Create one above!</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
  
  <form method="POST" action="/api/auth/logout" class="text-xs text-right mt-6">
      <button type="submit" class="text-text-secondary hover:text-red-400 transition-colors underline underline-offset-4">Logout safely</button>
  </form>
</div>
