<script lang="ts">
    import { Icon } from '@facile/muse';
    import { tintOf } from '$lib/artwork';
    import { kindIcons } from '$lib/icons';
    import type { MediaKind } from '$lib/library';

    let { title, kind, class: className = '' }: { title: string; kind: MediaKind; class?: string } = $props();

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
The placeholder shown where a poster or a cover will go: a tinted block with the icon of the
media kind. It is decoration, so the title next to it carries the name.
-->

<div
    class="flex items-center justify-center rounded-fc-lg text-fc-fg-muted {tints[tintOf(title)]} {className}"
    aria-hidden="true"
>
    <Icon icon={kindIcons[kind]} size={40} />
</div>
