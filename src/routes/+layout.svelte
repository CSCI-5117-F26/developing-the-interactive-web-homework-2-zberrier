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
	<button class='pure-button buttons' onclick={()=>{goto(resolve('/todos'), { invalidateAll: true })}}>Todos</button>
	<button class='pure-button buttons' onclick={()=>{goto(resolve('/done'), { invalidateAll: true })}}>Completed</button>
	{#if data.user}
		<button class='pure-button buttons' onclick={async()=>{await signout();}}>Logout</button>
	{/if}
</div>

{@render children()}

<style>
	#headerButtons {
		background-color: rgb(84, 134, 131);
		max-height: 10vh;
		display: flex;
		justify-content: flex-end;
		font-size: 1.5em;
	}

	.buttons {
		margin: 0.5em;
	}

	#headerButtons button {
		background-color: rgb(179, 198, 196);
		color: black;
		border-radius: 0.5em;
	}

	:global(.body) {
		background-color: rgb(179, 198, 196);
		min-height: 91vh;
		font-size: 1.5em;
	}
</style>
