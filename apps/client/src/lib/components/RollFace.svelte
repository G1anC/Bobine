<script lang="ts">
    import { Icon } from '@facile/muse';
    import ScrambleText from '$lib/components/ScrambleText.svelte';

    let { label, icon }: { label?: string; icon?: string } = $props();
</script>

<!--
@component
The inside of a bar button. When the button is hovered, focused, pressed or marks the current
page, a white disc grows from the bottom edge and the label rolls up out of view while a black
copy rolls in under it. The button needs `relative isolate overflow-hidden`. Its height is
`--roll-h` (2rem unless the button sets it), which the disc and the roll are sized from, and
`--roll-ink` changes the colour of the rolled-in copy. Icon-only buttons need an `aria-label`.
Nothing moves for someone who asked for reduced motion.
-->

{#snippet face(scramble: boolean)}
    {#if icon}<Icon {icon} size={18} />{/if}
    {#if label}{#if scramble}<ScrambleText text={label} />{:else}{label}{/if}{/if}
{/snippet}

<span aria-hidden="true" class="disc"></span>
<span class="face">{@render face(false)}</span>
<span aria-hidden="true" class="face ink">{@render face(true)}</span>

<style>
    .disc {
        position: absolute;
        top: 100%;
        left: 50%;
        z-index: -1;
        width: calc(100% + 2 * var(--roll-h, 2rem));
        aspect-ratio: 1;
        border-radius: 9999px;
        background: var(--color-white);
        translate: -50% -50%;
        scale: 0;
        pointer-events: none;
        transition: scale 360ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .face {
        --roll: calc(var(--roll-h, 2rem) / 2 + 0.7em);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.4em;
        transition: translate 360ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .ink {
        position: absolute;
        inset: 0;
        color: var(--roll-ink, var(--color-black));
        translate: 0 var(--roll);
    }

    :global(:is(:hover, :focus-visible, [aria-pressed='true'], [aria-current='page'])) > .disc {
        scale: 1;
        transition-duration: 550ms;
        transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }

    :global(:is(:hover, :focus-visible, [aria-pressed='true'], [aria-current='page'])) > .face {
        translate: 0 calc(var(--roll) * -1);
        transition-duration: 500ms;
    }

    :global(:is(:hover, :focus-visible, [aria-pressed='true'], [aria-current='page'])) > .ink {
        translate: 0 0;
    }

    @media (prefers-reduced-motion: reduce) {
        .disc,
        .face {
            transition: none;
        }
    }
</style>
