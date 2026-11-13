<script lang="ts">
    import Artwork from '$lib/components/Artwork.svelte';
    import { isVideo, type MediaItem } from '$lib/library';

    let { item }: { item: MediaItem } = $props();

    const shape = $derived(isVideo(item.kind) ? 'aspect-2/3' : 'aspect-square');
</script>

<!--
@component
One title in a shelf: its artwork alone, as a single link to the detail page so a remote
reaches it in one step. The artwork already shows the name, so nothing is written over it.
On hover or focus the tile grows and comes above its neighbours. The link carries the name
and year for screen readers.
-->

<a
    href="/title/{item.id}"
    class="relative flex flex-col rounded-2xl overflow-hidden outline-offset-4 outline-fc-ring transition-transform
        duration-300 ease-[cubic-bezier(0.3,0,0.3,1)] motion-reduce:transition-none
        hover:z-10 hover:scale-105 focus-visible:z-10 focus-visible:scale-105 focus-visible:outline-solid"
    aria-label="{item.title}, {item.year}"
>
    <Artwork title={item.title} kind={item.kind} image={item.image} class="{shape} w-full" />
</a>
