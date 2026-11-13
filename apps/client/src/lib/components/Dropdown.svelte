<script lang="ts">
    import { tick } from 'svelte';
    import { cubicOut } from 'svelte/easing';
    import type { HTMLAttributes } from 'svelte/elements';
    import { slide } from 'svelte/transition';
    import RollFace from '$lib/components/RollFace.svelte';
    import { appIcons } from '$lib/icons';

    let {
        label,
        options,
        value = $bindable(),
        icon,
        class: className = '',
        ...rest
    }: HTMLAttributes<HTMLDivElement> & {
        label: string;
        options: { label: string; value: string }[];
        value: string;
        icon?: string;
    } = $props();

    const COLUMNS = 5;
    const MORPH_MS = 320;

    const listId = $props.id();
    const still = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const button =
        'relative isolate flex h-8 min-w-8 items-center justify-center overflow-hidden rounded-[18px] px-2.5 text-fc-sm text-shell-fg outline-offset-2 outline-shell-fg focus-visible:outline-solid';

    let open = $state(false);
    let width = $state<string>();
    let root: HTMLElement;
    let trigger: HTMLButtonElement;
    let list = $state<HTMLElement>();
    const chosen = $derived(options.find((option) => option.value === value) ?? options[0]);
    const columns = $derived(Math.min(COLUMNS, options.length));

    function padding(): number {
        const style = getComputedStyle(root);
        return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    }

    async function show() {
        width = `${root.offsetWidth}px`;
        open = true;
        await tick();
        if (!list) return;
        width = `${Math.max(root.offsetWidth, list.scrollWidth + padding())}px`;
        list.querySelector<HTMLElement>('[aria-pressed="true"]')?.focus();
    }

    function hide(refocus: boolean) {
        open = false;
        width = `${trigger.offsetWidth + padding()}px`;
        if (refocus) trigger.focus();
    }

    function pick(next: string) {
        value = next;
        hide(true);
    }

    function onKey(event: KeyboardEvent) {
        if (!open || event.key !== 'Escape') return;
        event.preventDefault();
        hide(true);
    }

    function settle(event: TransitionEvent) {
        if (event.target === root && event.propertyName === 'width' && !open) width = undefined;
    }

    $effect(() => {
        if (!open) return;
        const onDown = (event: PointerEvent) => {
            if (event.target instanceof Node && !root.contains(event.target)) hide(false);
        };
        document.addEventListener('pointerdown', onDown);
        return () => document.removeEventListener('pointerdown', onDown);
    });
</script>

<!--
@component
A picker that lives in a tab hanging from the top of the page frame. Opening it grows the tab
itself, wider and taller, into a grid of options, so the frame seems to open rather than a
menu to pop over it; closing shrinks it back to the button. Every button rolls like the other
bar buttons and the chosen option stays filled. Escape or a click outside closes it and gives
focus back to the button. Values are strings. Extra attributes, such as the remote zone and
the position, land on the tab. The clipping happens on an inner box, so the tab keeps the
curved corners that flare it into the frame. Nothing grows or slides for someone who asked for reduced motion.
-->

<div
    bind:this={root}
    {...rest}
    role="presentation"
    class="merge-top rounded-b-[28px] bg-shell px-2 pb-1 {className}"
    style:width
    style:transition={still ? 'none' : `width ${MORPH_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`}
    onkeydown={onKey}
    ontransitionend={settle}
>
    <div class="flex flex-col items-center overflow-hidden">
        <button
            bind:this={trigger}
            type="button"
            aria-label="{label}: {chosen?.label}"
            aria-expanded={open}
            aria-controls={listId}
            class="{button} shrink-0"
            onclick={() => (open ? hide(true) : show())}
        >
            <RollFace {icon} label={chosen?.label} trailing={appIcons.chevronDown} />
        </button>
        {#if open}
            <div
                bind:this={list}
                id={listId}
                role="group"
                aria-label={label}
                class="grid w-max shrink-0 gap-1 pt-2 pb-1"
                style:grid-template-columns="repeat({columns}, minmax(0, 1fr))"
                transition:slide={{ duration: still ? 0 : MORPH_MS, easing: cubicOut }}
            >
                {#each options as option (option.value)}
                    <button
                        type="button"
                        aria-pressed={option.value === value}
                        class={button}
                        onclick={() => pick(option.value)}
                    >
                        <RollFace label={option.label} />
                    </button>
                {/each}
            </div>
        {/if}
    </div>
</div>
