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
        row: 'flex gap-4 overflow-x-auto *:w-32 *:shrink-0 md:*:w-40',
        grid: 'grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-4 md:gap-6'
    };
</script>

<!--
@component
A titled set of media tiles: one scrolling row, or a grid that wraps. It renders its empty
state while it has no items. The list is padded so a focus ring is never cut off.
-->

<section class="flex flex-col gap-4" aria-label={title}>
    <h2 class="text-fc-lg font-semibold text-fc-fg">{title}</h2>
    {#if items.length > 0}
        <ul class="-m-2 p-2 {layouts[layout]}">
            {#each items as item (item.id)}
                <li><MediaTile {item} /></li>
            {/each}
        </ul>
    {:else}
        <EmptyState {icon} title={empty} />
    {/if}
</section>
