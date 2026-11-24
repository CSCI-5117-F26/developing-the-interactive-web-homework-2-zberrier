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
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/base-min.css">
</svelte:head>

<div id='headerButtons'>
	<button class='pure-button' onclick={()=>{goto(resolve('/todos'), { invalidateAll: true })}}>Todos</button>
	<button class='pure-button' onclick={()=>{goto(resolve('/done'), { invalidateAll: true })}}>Completed</button>
	{#if data.user}
		<button class='pure-button' onclick={async()=>{await signout();}}>Logout</button>
	{/if}
</div>

{@render children()}

<style>
	#headerButtons {
		background-color: rgb(84, 134, 131);
		padding: 1em;
		display: flex;
		justify-content: flex-end;
		gap: 1em;
		font-size: 1.5em;
	}

	#headerButtons button {
		background-color: rgb(179, 198, 196);
		color: black;
		border-radius: 0.5em;
	}

	:global(.body) {
		background-color: rgb(179, 198, 196);
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
		font-size: 1.5em;
	}
</style>
