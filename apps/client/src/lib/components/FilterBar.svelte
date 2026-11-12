<script lang="ts" generics="Value">
    import { Button } from '@facile/muse';

    let {
        label,
        options,
        value = $bindable()
    }: { label: string; options: { label: string; value: Value }[]; value: Value } = $props();
</script>

<!--
@component
A row of filters floating over the top of a page on a blurred card, like the menu: one
button per option, and the chosen one is pressed. It is its own zone for the remote, entered
with Up from normal mode, where Left and Right walk the options and OK picks one. Only the
card takes clicks, so the page stays reachable around it.
-->

<div class="pointer-events-none absolute inset-x-0 top-4 z-20 flex justify-center px-4">
    <div
        data-zone="up"
        role="group"
        aria-label={label}
        class="pointer-events-auto flex flex-wrap justify-center gap-2 rounded-fc-lg bg-fc-component/80 p-2
            backdrop-blur-xl"
    >
        {#each options as option (option.label)}
            <Button
                size="lg"
                variant={option.value === value ? 'primary' : 'secondary'}
                aria-pressed={option.value === value}
                onclick={() => (value = option.value)}
            >
                {option.label}
            </Button>
        {/each}
    </div>
</div>
