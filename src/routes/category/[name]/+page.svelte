<script lang="ts">
  let { data } = $props();

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
  <title>{data.category.toUpperCase()} | agungm.</title>
</svelte:head>

<div class="max-w-3xl mt-16 mb-32">
  <div class="mb-16 border-l-4 border-accent pl-6">
    <span class="text-accent font-semibold text-xs uppercase tracking-widest mb-2 block">Kategori</span>
    <h1 class="text-4xl md:text-5xl font-bold tracking-tighter text-white uppercase">{data.category}</h1>
    <p class="text-text-secondary mt-3 text-lg">Menampilkan {data.articles.length} postingan materi.</p>
  </div>
  
  {#if data.articles.length === 0}
    <div class="border border-surface-200 rounded-lg p-12 text-center bg-surface-100/30">
      <p class="text-text-secondary mb-3">Materi belum tersedia di kategori ini.</p>
      <a href="/" class="text-accent hover:text-white transition-colors text-sm underline underline-offset-4">Kembali ke Beranda</a>
    </div>
  {:else}
    <div class="flex flex-col border-t border-surface-200">
      {#each data.articles as article}
        <a href={`/articles/${article.slug}`} class="py-8 border-b border-surface-200 group block relative">
          <div class="absolute inset-x-0 inset-y-0 bg-surface-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 -mx-6 rounded-lg pointer-events-none"></div>
          <div class="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-3">
            <h2 class="text-2xl font-semibold tracking-tight text-white group-hover:text-accent transition-colors duration-300">{article.title}</h2>
            <div class="flex gap-4 text-xs font-mono text-text-secondary">
              <span>{formatDate(article.createdAt)}</span>
              <span>&middot;</span>
              <span>{getReadTime(article.content)}</span>
            </div>
          </div>
          <p class="text-text-secondary leading-relaxed max-w-2xl">{article.excerpt}</p>
        </a>
      {/each}
    </div>
  {/if}
</div>
