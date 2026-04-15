<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col font-sans">
	<header class="py-10 px-8 md:px-12 xl:px-24 mb-12">
		<nav class="max-w-5xl mx-auto flex justify-between items-center">
			<a href="/" class="text-xl font-bold tracking-tighter hover:text-accent transition-colors duration-250 ease-in-out">agungnotes.</a>
			<div class="flex flex-wrap gap-4 md:gap-8 gap-y-2 text-sm font-medium text-text-secondary items-center justify-end">
                <a href="/html" class="hover:text-white transition-colors duration-250 tracking-wider">HTML</a>
                <a href="/css" class="hover:text-white transition-colors duration-250 tracking-wider">CSS</a>
                <a href="/javascript" class="hover:text-white transition-colors duration-250 tracking-wider">Javascript</a>
				<a href="/about" class="hover:text-white transition-colors duration-250 ml-2 md:ml-4 pb-0.5 border-b border-surface-200 hover:border-white tracking-wider">About</a>
			</div>
		</nav>
	</header>
	
	<main class="flex-grow max-w-5xl mx-auto w-full px-8 md:px-12">
		{@render children()}
	</main>
	
	<footer class="mt-32 border-t border-surface-200">
		<div class="max-w-5xl mx-auto px-8 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
			<p class="text-sm text-text-secondary font-mono">
				made with <span class="text-red-400">♥</span> and a glass of <span class="text-amber-400">☕</span> by <a href="/about" class="text-white hover:text-accent transition-colors underline underline-offset-4">agungnotes.</a>
			</p>
			<p class="text-xs text-text-secondary opacity-40 font-mono italic">&copy; {new Date().getFullYear()}</p>
		</div>
	</footer>
</div>
