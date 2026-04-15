<script lang="ts">
  let { data } = $props();
  
  let featuredArticle = $derived(data.articles[0]);
  let otherArticles = $derived(data.articles.slice(1));

  function formatDate(d: Date) {
      if(!d) return '';
      return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
</script>

<svelte:head>
  <title>agungnotes. | Content is the interface</title>
</svelte:head>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 items-start mt-12">
  
  {#if featuredArticle}
  <article class="lg:col-span-7 flex flex-col gap-6 relative group">
    <div class="absolute -left-8 top-0 w-1 h-full bg-surface-200 group-hover:bg-accent transition-colors duration-500"></div>
    <div class="flex gap-4 text-xs font-mono text-accent tracking-widest pl-2">
      <span>FEATURED</span>
      <span>//</span>
      <span>{formatDate(featuredArticle.createdAt)}</span>
    </div>
    
    <a href={`/${(featuredArticle.tags?.[0] || 'post').toLowerCase()}/${featuredArticle.slug}`} class="block pl-2">
      <h1 class="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-6 hover:text-accent transition-colors duration-300 text-white">
        {featuredArticle.title}
      </h1>
      {#if featuredArticle.cover_image}
        <img src={featuredArticle.cover_image} alt={featuredArticle.title} class="w-full h-80 object-cover rounded-lg mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
      {/if}
      <p class="text-xl text-text-secondary leading-relaxed max-w-xl mb-8 font-light">
        {featuredArticle.excerpt || 'No description available.'}
      </p>
    </a>
    
    {#if featuredArticle.tags && featuredArticle.tags.length > 0}
      <div class="flex gap-3 pl-2 mt-2 border-l border-surface-200">
        {#each featuredArticle.tags as tag}
          <span class="px-3 py-1 border border-surface-200 rounded-full text-xs text-text-secondary">{tag}</span>
        {/each}
      </div>
    {/if}
  </article>
  {/if}

  <div class="lg:col-span-5 flex flex-col gap-12 lg:mt-32">
    <h2 class="text-xs font-bold tracking-widest text-text-secondary uppercase mb-4 border-b border-surface-200 pb-4">Latest Index</h2>
    
    <div class="flex flex-col gap-10">
      {#each otherArticles as article}
        <article class="group">
          <a href={`/${(article.tags?.[0] || 'post').toLowerCase()}/${article.slug}`} class="block">
            <span class="text-xs font-mono text-surface-200 group-hover:text-accent transition-colors duration-300 mb-2 block">{formatDate(article.createdAt)}</span>
            <h3 class="text-2xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300 tracking-tight text-white">{article.title}</h3>
            <p class="text-base text-text-secondary line-clamp-2 leading-relaxed">{article.excerpt}</p>
          </a>
        </article>
      {/each}
    </div>
    
    <a href="/html" class="mt-8 inline-flex items-center text-sm font-medium hover:text-accent transition-colors duration-300 group">
      <span class="link-hover text-white group-hover:text-accent">View all entries</span>
      <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300 text-white group-hover:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l4-4m4-4H3"></path></svg>
    </a>
  </div>

</div>
