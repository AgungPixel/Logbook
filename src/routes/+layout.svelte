<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col font-sans">
	<header class="py-10 px-8 md:px-12 xl:px-24 mb-12">
		<nav class="max-w-5xl mx-auto flex justify-between items-center">
			<a href="/" class="text-xl font-bold tracking-tighter hover:text-accent transition-colors duration-250 ease-in-out">agungm.</a>
			<div class="flex flex-wrap gap-4 md:gap-8 gap-y-2 text-sm font-medium text-text-secondary items-center justify-end">
                <a href="/category/html" class="hover:text-white transition-colors duration-250 tracking-wider">HTML</a>
                <a href="/category/css" class="hover:text-white transition-colors duration-250 tracking-wider">CSS</a>
                <a href="/category/javascript" class="hover:text-white transition-colors duration-250 tracking-wider">Javascript</a>
				<a href="/about" class="hover:text-white transition-colors duration-250 ml-2 md:ml-4 pb-0.5 border-b border-surface-200 hover:border-white tracking-wider">About</a>
			</div>
		</nav>
	</header>
	
	<main class="flex-grow max-w-5xl mx-auto w-full px-8 md:px-12">
		{@render children()}
	</main>
	
	<footer class="py-16 border-t border-surface-200 mt-24">
		<div class="max-w-5xl mx-auto px-8 text-sm text-text-secondary flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
			<p>&copy; {new Date().getFullYear()} - Content is the interface.</p>
			<p>Precision over decoration.</p>
		</div>
	</footer>
</div>
