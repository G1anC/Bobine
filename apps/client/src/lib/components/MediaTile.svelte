<script lang="ts">
    import Artwork from '$lib/components/Artwork.svelte';
    import type { MediaItem } from '$lib/library';

    let { item }: { item: MediaItem } = $props();
</script>

<!--
@component
One title in a shelf: its placeholder artwork, its name and its year, as a single link to the
detail page so a remote reaches it in one step.
-->

<a
    href="/title/{item.id}"
    class="flex flex-col gap-2 rounded-fc-lg outline-offset-4 outline-fc-ring focus-visible:outline-solid"
>
    <Artwork title={item.title} kind={item.kind} class="aspect-2/3 w-full" />
    <span class="flex flex-col">
        <span class="line-clamp-2 text-fc-sm text-fc-fg">{item.title}</span>
        <span class="text-fc-xs text-fc-fg-muted">{item.year}</span>
    </span>
</a>
