<script lang="ts">
    import { Button, EmptyState } from '@facile/muse';
    import { page } from '$app/state';
    import Artwork from '$lib/components/Artwork.svelte';
    import TrackList from '$lib/components/TrackList.svelte';
    import { appIcons, kindIcons } from '$lib/icons';
    import { isVideo, library, type MediaItem, type MediaKind } from '$lib/library';
    import { formatDuration } from '$lib/time';

    const kinds: Record<MediaKind, { label: string; tracks: string }> = {
        movie: { label: 'Movie', tracks: 'Parts' },
        show: { label: 'Show', tracks: 'Episodes' },
        album: { label: 'Album', tracks: 'Tracks' },
        podcast: { label: 'Podcast', tracks: 'Episodes' }
    };

    let item = $state<MediaItem>();
    let loaded = $state(false);

    $effect(() => {
        void library.get(page.params.id ?? '').then((found) => {
            item = found;
            loaded = true;
        });
    });

    const shape = $derived(item && isVideo(item.kind) ? 'aspect-2/3' : 'aspect-square');

    function facts(item: MediaItem): string {
        const seconds = item.tracks.reduce((sum, track) => sum + track.seconds, 0);
        return [kinds[item.kind].label, item.year, formatDuration(seconds)].join(' · ');
    }
</script>

<svelte:head><title>{item?.title ?? 'Not found'} · Bobine</title></svelte:head>

{#if item}
    <article class="flex flex-col gap-10">
        <header class="flex flex-col gap-6 md:flex-row md:items-end">
            <Artwork
                title={item.title}
                kind={item.kind}
                image={item.image}
                class="{shape} w-40 shrink-0 rounded-fc-lg md:w-56"
            />
            <div class="flex max-w-prose flex-col gap-4">
                <h1 class="text-fc-3xl text-fc-fg">{item.title}</h1>
                <p class="text-fc-sm text-fc-fg-muted">{facts(item)}</p>
                <p class="text-fc-md text-fc-fg">{item.summary}</p>
                <Button href="/play/{item.id}" icon={appIcons.play} size="lg" class="w-fit">Play</Button>
                <p class="text-fc-xs text-fc-fg-muted">
                    By {item.credit}. Licence:
                    <a class="underline" href={item.licenseUrl} target="_blank" rel="noreferrer">{item.license}</a>.
                    Source:
                    <a class="underline" href={item.source} target="_blank" rel="noreferrer">Internet Archive</a>.
                </p>
            </div>
        </header>
        {#if item.tracks.length > 1}
            <TrackList title={kinds[item.kind].tracks} {item} />
        {/if}
    </article>
{:else if loaded}
    <EmptyState icon={kindIcons.movie} title="This title is not in your library">
        <Button href="/" variant="secondary" size="lg">Back to home</Button>
    </EmptyState>
{/if}
