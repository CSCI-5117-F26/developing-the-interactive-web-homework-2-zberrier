<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- <div>
	<form>
		<label>Search bar: <input type='text' placeholder='search bar'></label>
	</form>
</div> -->

{@render children()}
