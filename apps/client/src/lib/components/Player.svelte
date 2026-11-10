<script lang="ts">
    import { Icon, IconButton, Progress } from '@facile/muse';
    import { appIcons } from '$lib/icons';
    import type { Track } from '$lib/library';
    import { seekTo } from '$lib/playback';
    import { clock } from '$lib/time';

    let { track, onprevious, onnext }: { track: Track; onprevious?: () => void; onnext?: () => void } = $props();

    const STEP = 15;

    let stage = $state<HTMLDivElement>();
    let paused = $state(true);
    let muted = $state(false);
    let position = $state(0);
    let duration = $state(0);

    const length = $derived(duration || track.seconds);

    $effect(() => {
        stage?.querySelector('button')?.focus({ preventScroll: true });
    });

    function seek(step: number) {
        position = seekTo(position, step, length);
    }

    function toggleFullscreen() {
        if (document.fullscreenElement) void document.exitFullscreen();
        else void stage?.requestFullscreen();
    }
</script>

<!--
@component
Plays one video inside Bobine. Every control is a real button, so a remote reaches it with
the arrows: play and pause, 15 seconds back or forward, the neighbouring tracks, mute and
full screen. Full screen takes the controls along with the picture.
-->

<div
    bind:this={stage}
    class="flex flex-col gap-4 bg-fc-page [&>video]:max-h-[60dvh] [&:fullscreen]:p-6 [&:fullscreen>video]:aspect-auto
        [&:fullscreen>video]:h-0 [&:fullscreen>video]:max-h-none [&:fullscreen>video]:flex-1"
>
    <!-- svelte-ignore a11y_media_has_caption -->
    <video
        src={track.url}
        autoplay
        playsinline
        bind:paused
        bind:muted
        bind:currentTime={position}
        bind:duration
        onended={onnext}
        class="aspect-video w-full rounded-fc-lg bg-fc-surface"
    ></video>
    <Progress value={position} max={length} label="Playback position" />
    <div class="flex flex-wrap items-center gap-2">
        <IconButton aria-label={paused ? 'Play' : 'Pause'} onclick={() => (paused = !paused)}>
            <Icon icon={paused ? appIcons.play : appIcons.pause} />
        </IconButton>
        <IconButton aria-label="Back {STEP} seconds" onclick={() => seek(-STEP)}>
            <Icon icon={appIcons.back} />
        </IconButton>
        <IconButton aria-label="Forward {STEP} seconds" onclick={() => seek(STEP)}>
            <Icon icon={appIcons.forward} />
        </IconButton>
        <IconButton aria-label="Previous" disabled={!onprevious} onclick={onprevious}>
            <Icon icon={appIcons.previous} />
        </IconButton>
        <IconButton aria-label="Next" disabled={!onnext} onclick={onnext}>
            <Icon icon={appIcons.next} />
        </IconButton>
        <span class="flex-1 px-2 text-fc-sm text-fc-fg-muted">{clock(position)} / {clock(length)}</span>
        <IconButton aria-label={muted ? 'Unmute' : 'Mute'} onclick={() => (muted = !muted)}>
            <Icon icon={muted ? appIcons.muted : appIcons.sound} />
        </IconButton>
        <IconButton aria-label="Full screen" onclick={toggleFullscreen}>
            <Icon icon={appIcons.expand} />
        </IconButton>
    </div>
</div>
