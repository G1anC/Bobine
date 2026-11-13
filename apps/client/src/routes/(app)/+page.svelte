<script lang="ts">
	import Shelf from '$lib/components/Shelf.svelte';
	import { appIcons } from '$lib/icons';
	import { library } from '$lib/library';
	import { session } from '$lib/session.svelte';

	const firstName = $derived(session.user?.name.trim().split(/\s+/)[0] ?? '');
</script>

<svelte:head><title>Home · Bobine</title></svelte:head>

<div class="flex flex-col gap-10">
	<h1 class="text-fc-2xl font-semibold text-fc-fg">{firstName ? `Hello, ${firstName}` : 'Home'}</h1>
	<Shelf title="Continue watching" icon={appIcons.movies} empty="Nothing in progress yet" />
	{#await library.all() then items}
		<Shelf title="Recently added" icon={appIcons.shows} empty="Your library is empty" {items} />
	{/await}
</div>
