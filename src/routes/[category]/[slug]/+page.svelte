<script lang="ts">
  let { data } = $props();
  let article = $derived(data.article);

  function formatDate(d: Date) {
      if(!d) return '';
      return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function getReadTime(content: string) {
      const words = content ? content.split(' ').length : 0;
      const minutes = Math.ceil(words / 200);
      return Math.max(1, minutes) + ' min read';
  }
</script>

<svelte:head>
  <title>{article.title} | agungnotes.</title>
</svelte:head>

<article class="max-w-3xl mt-16 mb-32 mx-auto">
  <div class="mb-16">
    <div class="flex gap-4 text-xs font-mono text-text-secondary mb-6">
      <span>{formatDate(article.createdAt)}</span>
      <span>&middot;</span>
      <span>{getReadTime(article.content)}</span>
    </div>
    
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.15] mb-8 text-white">
      {article.title}
    </h1>
    
    {#if article.tags && article.tags.length > 0}
      <div class="flex gap-3">
        {#each article.tags as tag}
          <span class="px-3 py-1 border border-surface-200 rounded-full text-xs text-text-secondary">{tag}</span>
        {/each}
      </div>
    {/if}
  </div>
  
  {#if article.cover_image}
    <img src={article.cover_image} alt={article.title} class="w-full h-80 lg:h-96 object-cover rounded-xl mb-16 opacity-90 shadow-2xl" />
  {/if}
  
  <div class="prose prose-invert prose-lg prose-p:text-text-secondary prose-headings:text-white prose-a:text-accent hover:prose-a:text-white prose-a:transition-colors prose-a:duration-300 w-full max-w-none">
    {@html article.content}
  </div>

  <div class="mt-24 pt-8 border-t border-surface-200 flex justify-between items-center">
    <a href={`/${(data.article.tags?.[0] || 'general').toLowerCase()}`} class="text-sm font-medium hover:text-accent transition-colors duration-300 group inline-flex items-center text-text-secondary">
      <span class="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Category
    </a>
  </div>
</article>
