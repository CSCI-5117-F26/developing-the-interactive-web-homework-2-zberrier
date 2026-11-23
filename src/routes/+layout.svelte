<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import type { LayoutProps } from './$types';
	import { authClient } from "#lib/auth-client.js";
	import { goto } from '$app/navigation';

	let { children, data }: LayoutProps = $props();

	async function signout() {
		await authClient.signOut();
		await goto(resolve('/'), { invalidateAll: true });
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div>
	<a href={resolve('/todos')}>Todos</a>
	<a href={resolve('/done')}>Completed</a>
	{#if data.user}
		<button onclick={async()=>{await signout();}}>Logout</button>
	{/if}
</div>

{@render children()}
