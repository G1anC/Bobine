<script lang="ts">
	import Shelf from '$lib/components/Shelf.svelte';
	import { appIcons } from '$lib/icons';
	import { library } from '$lib/library';
</script>

<svelte:head><title>Shows · Bobine</title></svelte:head>

<div class="flex flex-col gap-10">
	<h1 class="text-fc-2xl font-semibold text-fc-fg">Shows</h1>
	{#await library.list('show') then items}
		<Shelf title="All shows" icon={appIcons.shows} empty="No shows yet" {items} layout="grid" />
	{/await}
</div>
