<script lang="ts">
    import { EmptyState } from '@facile/muse';
    import MediaTile from '$lib/components/MediaTile.svelte';
    import type { MediaItem } from '$lib/library';

    let {
        title,
        icon,
        empty,
        items = [],
        layout = 'row'
    }: { title: string; icon: string; empty: string; items?: MediaItem[]; layout?: 'row' | 'grid' } = $props();

    const layouts = {
        row: 'flex gap-3 overflow-x-auto *:w-40 *:shrink-0 md:*:w-60',
        grid: 'grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-3'
    };
</script>

<!--
@component
A titled set of media tiles: one scrolling row, or a grid that wraps. It renders its empty
state while it has no items. The list is padded so a grown tile and its focus ring are never
cut off.
-->

<section class="flex flex-col gap-4" aria-label={title}>
    <h2 class="text-fc-lg font-semibold text-fc-fg">{title}</h2>
    {#if items.length > 0}
        <ul class="-m-5 p-5 {layouts[layout]}">
            {#each items as item (item.id)}
                <li><MediaTile {item} /></li>
            {/each}
        </ul>
    {:else}
        <EmptyState {icon} title={empty} />
    {/if}
</section>
