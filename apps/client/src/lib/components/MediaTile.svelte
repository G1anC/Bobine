<script lang="ts">
    import Artwork from '$lib/components/Artwork.svelte';
    import { isVideo, type MediaItem } from '$lib/library';

    let { item }: { item: MediaItem } = $props();

    const shape = $derived(isVideo(item.kind) ? 'aspect-2/3' : 'aspect-square');

    const motion = 'duration-300 ease-[cubic-bezier(0.3,0,0.3,1)] motion-reduce:transition-none';
    const lift = `translate-y-3 opacity-0 transition ${motion}
        group-hover:translate-y-0 group-hover:opacity-100
        group-focus-visible:translate-y-0 group-focus-visible:opacity-100`;
    const rise = `translate-y-full opacity-0 transition will-change-transform ${motion}
        group-hover:translate-y-0 group-hover:opacity-100
        group-focus-visible:translate-y-0 group-focus-visible:opacity-100`;
</script>

<!--
@component
One title in a shelf: its artwork, its name and its year, as a single link to the detail
page so a remote reaches it in one step. On hover or focus the whole tile grows and comes
above its neighbours, and a label in the colour of the page lifts into place at the bottom of
the picture; inside it the name rises first and the year just after. Every effect shares one
timing. The link carries the name for screen readers at all times.
-->

<a
    href="/title/{item.id}"
    class="group relative flex flex-col gap-2 rounded-2xl overflow-hidden outline-offset-4 outline-fc-ring transition-transform {motion}
        hover:z-10 hover:scale-105 focus-visible:z-10 focus-visible:scale-105 focus-visible:outline-solid"
    aria-label="{item.title}, {item.year}"
>
    <Artwork title={item.title} kind={item.kind} image={item.image} class="{shape} w-full" />
    <span class="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-0.5 bg-panel px-3 py-2 {lift}">
        <span class="block overflow-hidden">
            <span class="line-clamp-2 text-sm text-fc-fg {rise}">{item.title}</span>
        </span>
        <span class="block overflow-hidden">
            <span class="block text-xs text-fc-fg-muted delay-75 {rise}">{item.year}</span>
        </span>
    </span>
</a>
