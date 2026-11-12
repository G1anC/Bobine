<script lang="ts">
    import Artwork from '$lib/components/Artwork.svelte';
    import { isVideo, type MediaItem } from '$lib/library';

    let { item }: { item: MediaItem } = $props();

    const shape = $derived(isVideo(item.kind) ? 'aspect-2/3' : 'aspect-square');

    const corners = ['-top-px -left-px', '-top-px -right-px', '-bottom-px -left-px', '-bottom-px -right-px'];
    const motion = 'duration-300 ease-[cubic-bezier(0.3,0,0.3,1)] motion-reduce:transition-none';
    const zoom = `origin-center backface-hidden transform-[translateZ(0)_scale(1)] transition-[transform,opacity]
        ${motion} group-hover:transform-[translateZ(0)_scale(1.08)] group-hover:opacity-75
        group-focus-visible:transform-[translateZ(0)_scale(1.08)] group-focus-visible:opacity-50`;
    const fade = `opacity-0 transition-opacity ${motion} group-hover:opacity-100 group-focus-visible:opacity-100`;
    const rise = `translate-y-full opacity-0 transition will-change-transform ${motion}
        group-hover:translate-y-0 group-hover:opacity-100
        group-focus-visible:translate-y-0 group-focus-visible:opacity-100`;
</script>

<!--
@component
One title in a shelf: its placeholder artwork, its name and its year, as a single link to the
detail page so a remote reaches it in one step. On hover or focus the whole tile grows and
comes above its neighbours, the picture zooms from its centre on its own GPU layer, which
keeps the zoom from stepping, a dark gradient comes up from the bottom, a small bracket fades
in at each corner, and the name and the year rise into place. Every effect shares one timing.
The link carries the name for screen readers at all times.
-->

<a
    href="/title/{item.id}"
    class="group relative flex flex-col gap-2 outline-offset-4 outline-fc-ring transition-transform {motion}
        hover:z-10 hover:scale-105 focus-visible:z-10 focus-visible:scale-105 focus-visible:outline-solid"
    aria-label="{item.title}, {item.year}"
>
    <Artwork title={item.title} kind={item.kind} image={item.image} imageClass={zoom} class="{shape} w-full" />
    <span
        class="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/50
            to-transparent {fade}"
    ></span>
    {#each corners as corner (corner)}
        <span class="pointer-events-none absolute z-10 h-px w-5 bg-fc-fg {fade} {corner}"></span>
        <span class="pointer-events-none absolute z-10 h-5 w-px bg-fc-fg {fade} {corner}"></span>
    {/each}
    <span class="absolute bottom-3 left-3 z-10 flex flex-col gap-0.5">
        <span class="block overflow-hidden">
            <span class="line-clamp-2 text-sm text-white {rise}">{item.title}</span>
        </span>
        <span class="block overflow-hidden">
            <span class="block text-xs text-white/80 {rise}">{item.year}</span>
        </span>
    </span>
</a>
