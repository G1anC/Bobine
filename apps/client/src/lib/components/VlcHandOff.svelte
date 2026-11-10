<script lang="ts">
    import { Button } from '@facile/muse';
    import { appIcons } from '$lib/icons';
    import type { Track } from '$lib/library';
    import { openInVlc } from '$lib/vlc';

    let { track, onplayhere }: { track: Track; onplayhere: () => void } = $props();

    let failed = $state(false);

    async function open(url: string) {
        failed = false;
        try {
            await openInVlc(url);
        } catch {
            failed = true;
        }
    }

    $effect(() => {
        void open(track.url);
    });
</script>

<!--
@component
Sends a video to VLC as soon as it is shown, and says what happened. It keeps two ways out:
sending it again, and playing inside Bobine when VLC is missing.
-->

<div class="flex flex-col items-start gap-4 rounded-fc-lg bg-fc-surface p-6">
    <p role="status" class="text-fc-md text-fc-fg">
        {#if failed}
            VLC did not start. Check that VLC is installed, or play the video here.
        {:else}
            Sent to VLC. The video plays in the VLC window.
        {/if}
    </p>
    <div class="flex flex-wrap gap-2">
        <Button size="lg" icon={appIcons.external} onclick={() => open(track.url)}>Open in VLC again</Button>
        <Button size="lg" variant="secondary" icon={appIcons.play} onclick={onplayhere}>Play here instead</Button>
    </div>
</div>
