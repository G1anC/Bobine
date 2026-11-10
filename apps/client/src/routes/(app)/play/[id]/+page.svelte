<script lang="ts">
    import { Button, EmptyState } from '@facile/muse';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import Player from '$lib/components/Player.svelte';
    import TrackList from '$lib/components/TrackList.svelte';
    import VlcHandOff from '$lib/components/VlcHandOff.svelte';
    import { kindIcons } from '$lib/icons';
    import { library, type MediaItem, type Track } from '$lib/library';
    import { neighbour, pickTrack } from '$lib/playback';
    import { canHandOff } from '$lib/vlc';

    let item = $state<MediaItem>();
    let loaded = $state(false);
    let here = $state(!canHandOff());

    $effect(() => {
        void library.get(page.params.id ?? '').then((found) => {
            item = found;
            loaded = true;
        });
    });

    const track = $derived(item ? pickTrack(item, page.url.searchParams.get('track')) : undefined);
    const previous = $derived(item && track ? neighbour(item, track.id, -1) : undefined);
    const next = $derived(item && track ? neighbour(item, track.id, 1) : undefined);

    function play(target: Track) {
        void goto(`/play/${page.params.id}?track=${target.id}`, { replaceState: true });
    }
</script>

<svelte:head><title>{item?.title ?? 'Not found'} · Bobine</title></svelte:head>

{#if item && track}
    <div class="flex flex-col gap-8">
        <header class="flex flex-col gap-1">
            <h1 class="text-fc-2xl text-fc-fg">{item.title}</h1>
            {#if item.tracks.length > 1}<p class="text-fc-sm text-fc-fg-muted">{track.title}</p>{/if}
        </header>
        {#if here}
            {#key track.id}
                <Player
                    {track}
                    onprevious={previous && (() => play(previous))}
                    onnext={next && (() => play(next))}
                />
            {/key}
        {:else}
            <VlcHandOff {track} onplayhere={() => (here = true)} />
        {/if}
        {#if item.tracks.length > 1}
            <TrackList title="Up next" {item} current={track.id} />
        {/if}
    </div>
{:else if loaded}
    <EmptyState icon={kindIcons.movie} title="This title is not in your library">
        <Button href="/" variant="secondary" size="lg">Back to home</Button>
    </EmptyState>
{/if}
