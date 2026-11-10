<script lang="ts">
    import Shelf from '$lib/components/Shelf.svelte';
    import { appIcons } from '$lib/icons';
    import { library } from '$lib/library';
</script>

<svelte:head><title>Podcasts · Bobine</title></svelte:head>

<div class="flex flex-col gap-10">
    <h1 class="text-fc-2xl font-semibold text-fc-fg">Podcasts</h1>
    {#await library.list('podcast') then items}
        <Shelf title="All podcasts" icon={appIcons.podcasts} empty="No podcasts yet" {items} layout="grid" />
    {/await}
</div>
