<script lang="ts">
  import { enhance } from '$app/forms';
  let title = $state('');
  
  // Auto-generate slug visually
  let slug = $derived(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  
  let tagsInput = $state('');
  let primaryTag = $derived(tagsInput.split(',')[0].trim());
</script>

<svelte:head>
  <title>New Post | agungm.</title>
</svelte:head>

<div class="max-w-4xl mt-16 mb-32 mx-auto px-6">
  <div class="mb-12">
    <a href="/admin" class="text-sm font-mono hover:text-white text-text-secondary transition-colors mb-4 inline-block">&larr; Back to Dashboard</a>
    <h1 class="text-4xl font-bold tracking-tighter text-white">Create Post.</h1>
  </div>

  <form method="POST" use:enhance class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <label for="title" class="text-xs font-bold tracking-widest text-text-secondary uppercase">Title</label>
      <input type="text" id="title" name="title" bind:value={title} required class="bg-surface-100 border border-surface-200 text-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full text-xl font-bold placeholder-surface-200" placeholder="An aesthetic title..." />
    </div>

    <div class="flex flex-col gap-2">
      <label for="slug" class="text-xs font-bold tracking-widest text-text-secondary uppercase">URL Slug (Auto)</label>
      <input type="text" id="slug" name="slug" value={slug} required class="bg-black border border-surface-200 text-text-secondary px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full font-mono text-sm" />
    </div>

    <div class="flex flex-col gap-2">
      <label for="tags" class="text-xs font-bold tracking-widest text-text-secondary uppercase">Tags & Category (Comma separated)</label>
      <input type="text" id="tags" name="tags" bind:value={tagsInput} class="bg-surface-100 border border-surface-200 text-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full placeholder-surface-200" placeholder="HTML, Tutorial, Guide..." />
      <span class="text-xs text-text-secondary mt-1">Smart Feature: The first tag (<strong class="text-accent">{primaryTag || '...'}</strong>) will automatically become the Post Category.</span>
    </div>

    <div class="flex flex-col gap-2">
      <label for="excerpt" class="text-xs font-bold tracking-widest text-text-secondary uppercase">Excerpt (Optional)</label>
      <textarea id="excerpt" name="excerpt" rows="2" class="bg-surface-100 border border-surface-200 text-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full placeholder-surface-200" placeholder="A short intriguing summary..."></textarea>
    </div>

    <div class="flex flex-col gap-2">
      <label for="cover_image" class="text-xs font-bold tracking-widest text-text-secondary uppercase">Cover Image (URL)</label>
      <input type="text" id="cover_image" name="cover_image" class="bg-surface-100 border border-surface-200 text-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full placeholder-surface-200" placeholder="https://images.unsplash.com/..." />
    </div>

    <div class="flex flex-col gap-2">
      <label for="content" class="text-xs font-bold tracking-widest text-text-secondary uppercase">Content (HTML Supported)</label>
      <textarea id="content" name="content" required rows="15" class="bg-surface-100 border border-surface-200 text-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full font-mono text-sm placeholder-surface-200" placeholder="<h2>Your main heading</h2><p>Your brilliant thoughts...</p>"></textarea>
    </div>

    <div class="flex justify-end mt-4">
      <button type="submit" class="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-accent transition-colors duration-300">
        Publish Post
      </button>
    </div>
  </form>
</div>
