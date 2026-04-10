<script lang="ts">
  import { enhance } from '$app/forms';
  let { data } = $props();
  
  let article = $derived(data.article);
  
  let title = $state('');
  let slug = $state('');
  let excerpt = $state('');
  let tagsInput = $state('');
  let cover_image = $state('');
  let content = $state('');
  
  // Set initial tag state safely due to SSR
  $effect(() => {
    if (article) {
      if(!title) title = article.title;
      if(!slug) slug = article.slug;
      if(!excerpt) excerpt = article.excerpt || '';
      if(!cover_image) cover_image = article.cover_image || '';
      if(!content) content = article.content;
      if (!tagsInput && article.tags.length > 0) {
        tagsInput = article.tags.join(', ');
      }
    }
  });

  let primaryTag = $derived(tagsInput.split(',')[0].trim());
</script>

<svelte:head>
  <title>Edit Post | agungm.</title>
</svelte:head>

<div class="max-w-4xl mt-16 mb-32 mx-auto px-6">
  <div class="mb-12">
    <a href="/admin" class="text-sm font-mono hover:text-white text-text-secondary transition-colors mb-4 inline-block">&larr; Back to Dashboard</a>
    <h1 class="text-4xl font-bold tracking-tighter text-white">Edit Post.</h1>
  </div>

  <form method="POST" use:enhance class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <label for="title" class="text-xs font-bold tracking-widest text-text-secondary uppercase">Title</label>
      <input type="text" id="title" name="title" bind:value={title} required class="bg-surface-100 border border-surface-200 text-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full text-xl font-bold placeholder-surface-200" />
    </div>

    <div class="flex flex-col gap-2">
      <label for="slug" class="text-xs font-bold tracking-widest text-text-secondary uppercase">URL Slug</label>
      <input type="text" id="slug" name="slug" bind:value={slug} required class="bg-black border border-surface-200 text-text-secondary px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full font-mono text-sm" />
    </div>

    <div class="flex flex-col gap-2">
      <label for="tags" class="text-xs font-bold tracking-widest text-text-secondary uppercase">Tags & Category (Comma separated)</label>
      <input type="text" id="tags" name="tags" bind:value={tagsInput} class="bg-surface-100 border border-surface-200 text-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full placeholder-surface-200" />
      <span class="text-xs text-text-secondary mt-1">Smart Feature: The first tag (<strong class="text-accent">{primaryTag || '...'}</strong>) will automatically become the Post Category.</span>
    </div>

    <div class="flex flex-col gap-2">
      <label for="excerpt" class="text-xs font-bold tracking-widest text-text-secondary uppercase">Excerpt (Optional)</label>
      <textarea id="excerpt" name="excerpt" bind:value={excerpt} rows="2" class="bg-surface-100 border border-surface-200 text-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full placeholder-surface-200"></textarea>
    </div>

    <div class="flex flex-col gap-2">
      <label for="cover_image" class="text-xs font-bold tracking-widest text-text-secondary uppercase">Cover Image (URL)</label>
      <input type="text" id="cover_image" name="cover_image" bind:value={cover_image} class="bg-surface-100 border border-surface-200 text-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full placeholder-surface-200" />
    </div>

    <div class="flex flex-col gap-2">
      <label for="content" class="text-xs font-bold tracking-widest text-text-secondary uppercase">Content (HTML Supported)</label>
      <textarea id="content" name="content" bind:value={content} required rows="15" class="bg-surface-100 border border-surface-200 text-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full font-mono text-sm placeholder-surface-200"></textarea>
    </div>

    <div class="flex justify-end mt-4">
      <button type="submit" class="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-accent transition-colors duration-300">
        Update Post
      </button>
    </div>
  </form>
</div>
