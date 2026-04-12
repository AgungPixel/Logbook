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
	
	<footer class="mt-32 border-t border-surface-200">
		<div class="max-w-5xl mx-auto px-8 md:px-12 py-12">
			<!-- Row Atas: Nama + Tagline -->
			<div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-10">
				<div>
					<a href="/" class="text-3xl font-bold tracking-tighter text-white hover:text-accent transition-colors duration-300">agungm.</a>
					<p class="text-text-secondary text-sm mt-1 font-mono">Content is the interface.</p>
				</div>
				<!-- Nav Singkat -->
				<nav class="flex gap-6 text-sm text-text-secondary">
					<a href="/category/html" class="hover:text-white transition-colors duration-250 hover:underline underline-offset-4">HTML</a>
					<a href="/category/css" class="hover:text-white transition-colors duration-250 hover:underline underline-offset-4">CSS</a>
					<a href="/category/javascript" class="hover:text-white transition-colors duration-250 hover:underline underline-offset-4">Javascript</a>
					<a href="/about" class="hover:text-white transition-colors duration-250 hover:underline underline-offset-4">About</a>
				</nav>
			</div>

			<!-- Garis Tipis Aksen -->
			<div class="h-px w-full bg-gradient-to-r from-accent via-surface-200 to-transparent mb-6"></div>

			<!-- Row Bawah: Copyright + Filosofi -->
			<div class="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-text-secondary font-mono">
				<p>&copy; {new Date().getFullYear()} Agung Marwanto. All rights reserved.</p>
				<p class="italic opacity-60">Precision over decoration.</p>
			</div>
		</div>
	</footer>
</div>
