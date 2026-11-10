<script lang="ts">
    import Shelf from '$lib/components/Shelf.svelte';
    import { appIcons } from '$lib/icons';
    import { library } from '$lib/library';
</script>

<svelte:head><title>Music · Bobine</title></svelte:head>

<div class="flex flex-col gap-10">
    <h1 class="text-fc-2xl font-semibold text-fc-fg">Music</h1>
    {#await library.list('album') then items}
        <Shelf title="All albums" icon={appIcons.music} empty="No music yet" {items} layout="grid" />
    {/await}
</div>
