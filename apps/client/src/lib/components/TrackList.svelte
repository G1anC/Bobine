<script lang="ts">
    import type { MediaItem } from '$lib/library';
    import { formatDuration } from '$lib/time';

    let { title, item }: { title: string; item: MediaItem } = $props();
</script>

<!--
@component
The episodes or tracks of a title, each one a link that starts playing it.
-->

<section class="flex flex-col gap-4" aria-label={title}>
    <h2 class="text-fc-lg font-semibold text-fc-fg">{title}</h2>
    <ol class="-m-2 flex flex-col gap-1 p-2">
        {#each item.tracks as track, index (track.id)}
            <li>
                <a
                    href="/play/{item.id}?track={track.id}"
                    class="flex min-h-11 items-center gap-4 rounded-fc-md px-3 py-2 text-fc-sm text-fc-fg outline-fc-ring
                        hover:bg-fc-surface focus-visible:outline-solid"
                >
                    <span class="w-6 text-fc-fg-muted">{index + 1}</span>
                    <span class="flex-1">{track.title}</span>
                    <span class="text-fc-xs text-fc-fg-muted">{formatDuration(track.seconds)}</span>
                </a>
            </li>
        {/each}
    </ol>
</section>
