<script lang="ts">
    type Hint = { keys: string[]; does: string };

    let { zone, hasFilter }: { zone: string | null; hasFilter: boolean } = $props();

    const inZone: Record<string, Hint[]> = {
        left: [
            { keys: ['↑', '↓'], does: 'Move' },
            { keys: ['OK'], does: 'Open' },
            { keys: ['Esc'], does: 'Leave the menu' }
        ],
        up: [
            { keys: ['OK'], does: 'Choose' },
            { keys: ['↑'], does: 'Top bar' },
            { keys: ['Esc'], does: 'Leave the filter' }
        ],
        top: [
            { keys: ['←', '→'], does: 'Move' },
            { keys: ['OK'], does: 'Select' },
            { keys: ['Esc'], does: 'Leave the bar' }
        ],
        main: [
            { keys: ['←', '↑', '↓', '→'], does: 'Move' },
            { keys: ['OK'], does: 'Open' },
            { keys: ['Esc'], does: 'Leave the page' }
        ]
    };

    const hints = $derived(
        (zone && inZone[zone]) || [
            { keys: ['←'], does: 'Menu' },
            { keys: ['↑'], does: hasFilter ? 'Filter' : 'Top bar' },
            { keys: ['→', '↓', 'OK'], does: 'Page' },
            { keys: ['Esc'], does: 'Back' }
        ]
    );
</script>

<!--
@component
The key hints floating over the bottom left corner of the page, on wide screens: one small bubble per
hint, in the style of the top bar. They say what the keys do right now: which zone each key
enters in normal mode, and how to move, act and leave inside the zone that holds focus.
Clicks pass through them to the page.
-->

<footer
    class="pointer-events-none absolute bottom-3 left-3 z-40 hidden gap-1.5 whitespace-nowrap md:flex"
>
    {#each hints as hint (hint.does)}
        <span class="flex h-6 items-center gap-1 rounded-full bg-shell py-0.5 pr-2.5 pl-1 text-[0.6875rem] text-shell-fg/60">
            {#each hint.keys as key (key)}
                <kbd
                    class="flex h-4 min-w-4 items-center justify-center rounded-full bg-shell-fg/10 px-1 font-mono
                        text-[0.625rem] text-shell-fg"
                >
                    {key}
                </kbd>
            {/each}
            <span class="pl-0.5">{hint.does}</span>
        </span>
    {/each}
</footer>
