<script lang="ts">
	import { goto } from '$app/navigation';
	let email = $state('');
	let password = $state('');
	let errorMsg = $state('');

	async function handleLogin(e: Event) {
		e.preventDefault();
		errorMsg = '';
		const res = await fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});
		
		if (res.ok) {
			window.location.href = '/admin'; // Force hard reload to update layout server SSR hooks
		} else {
			const data = await res.json();
			errorMsg = data.error || 'Login failed';
		}
	}
</script>

<svelte:head>
  <title>Admin Login | agungnotes.</title>
</svelte:head>

<div class="min-h-[70vh] flex items-center justify-center">
	<div class="w-full max-w-md p-8 border border-surface-200 bg-surface-100/50 rounded-lg">
		<h1 class="text-3xl font-bold tracking-tighter mb-2">Secure Gateway.</h1>
		<p class="text-sm text-text-secondary mb-8">Access restricted to authorized personnel.</p>
		
		<form onsubmit={handleLogin} class="flex flex-col gap-6">
			{#if errorMsg}
				<div class="p-3 text-sm text-red-200 bg-red-950/30 border border-red-900/50 rounded">
					{errorMsg}
				</div>
			{/if}
			
			<div class="flex flex-col gap-2">
				<label for="email" class="text-xs font-bold tracking-widest text-text-secondary uppercase">Email Address</label>
				<input 
					type="email" 
					id="email" 
					bind:value={email} 
					required
					class="bg-black border border-surface-200 text-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full"
				/>
			</div>
			
			<div class="flex flex-col gap-2">
				<label for="password" class="text-xs font-bold tracking-widest text-text-secondary uppercase">Password</label>
				<input 
					type="password" 
					id="password" 
					bind:value={password} 
					required
					class="bg-black border border-surface-200 text-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors w-full"
				/>
			</div>
			
			<button 
				type="submit" 
				class="bg-white text-black font-semibold py-3 rounded-full hover:bg-accent transition-colors duration-300 mt-4"
			>
				Authenticate
			</button>
		</form>
	</div>
</div>
