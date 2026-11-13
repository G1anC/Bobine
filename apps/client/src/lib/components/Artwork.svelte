<script lang="ts">
    import { Icon } from '@facile/muse';
    import { tintOf } from '$lib/artwork';
    import { kindIcons } from '$lib/icons';
    import type { MediaKind } from '$lib/library';

    let {
        title,
        kind,
        image,
        imageClass = '',
        class: className = ''
    }: { title: string; kind: MediaKind; image?: string; imageClass?: string; class?: string } = $props();

    const tints = [
        'bg-fc-chart-1/25',
        'bg-fc-chart-2/25',
        'bg-fc-chart-3/25',
        'bg-fc-chart-4/25',
        'bg-fc-chart-5/25',
        'bg-fc-chart-6/25'
    ];
</script>

<!--
@component
The picture of a title. A tinted block with the icon of the media kind is always there, and
the image covers it once it has loaded, so a slow or missing image never leaves a hole.
`imageClass` styles the image alone, for effects that must not touch the block. It is
decoration, so the title next to it carries the name.
-->

<div
    class="relative flex items-center justify-center overflow-hidden text-fc-fg-muted
        {tints[tintOf(title)]} {className}"
    aria-hidden="true"
>
    <Icon icon={kindIcons[kind]} size={40} />
    {#if image}
        <img src={image} alt="" loading="lazy" class="absolute inset-0 size-full object-cover {imageClass}" />
    {/if}
</div>
