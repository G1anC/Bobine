<script lang="ts">
	import Shelf from '$lib/components/Shelf.svelte';
	import { appIcons } from '$lib/icons';
	import { library } from '$lib/library';
</script>

<svelte:head><title>Movies · Bobine</title></svelte:head>

<div class="flex flex-col gap-10">
	<h1 class="text-fc-2xl font-semibold text-fc-fg">Movies</h1>
	{#await library.list('movie') then items}
		<Shelf title="All movies" icon={appIcons.movies} empty="No movies yet" {items} layout="grid" />
	{/await}
</div>
