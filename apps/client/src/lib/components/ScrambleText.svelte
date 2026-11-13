<script lang="ts">
    import { onMount } from 'svelte';
    import { waveFrame, waveSteps } from '$lib/scramble';

    let { text }: { text: string } = $props();

    const STEP_MS = 45;

    let root: HTMLSpanElement;
    let step = $state(-1);
    let timer: ReturnType<typeof setInterval> | undefined;
    const shown = $derived(step < 0 ? text : waveFrame(text, step));

    function stop() {
        clearInterval(timer);
        timer = undefined;
        step = -1;
    }

    function play() {
        if (timer || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        step = 0;
        timer = setInterval(() => {
            step += 1;
            if (step > waveSteps(text)) stop();
        }, STEP_MS);
    }

    onMount(() => {
        const control = root.closest('a, button') ?? root;
        const onFocus = () => {
            if (control.matches(':focus-visible')) play();
        };
        control.addEventListener('pointerenter', play);
        control.addEventListener('focusin', onFocus);
        return () => {
            control.removeEventListener('pointerenter', play);
            control.removeEventListener('focusin', onFocus);
            stop();
        };
    });
</script>

<!--
@component
A label that sends a scramble wave through its letters when the pointer comes over the link or
button around it, or when a keyboard or a remote focuses it. The whole text stays in place,
invisible, to hold the width, and the wave is drawn on top of it, so the glyphs never make the
control grow or shrink. Screen readers only get the whole text. Nothing moves for someone who
asked for reduced motion.
-->

<span bind:this={root} class="relative inline-block whitespace-pre">
    <span aria-hidden="true" class="invisible">{text}</span>
    <span aria-hidden="true" class="absolute inset-0">{shown}</span>
    <span class="sr-only">{text}</span>
</span>
