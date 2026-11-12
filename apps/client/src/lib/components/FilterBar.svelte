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
A row of filters laid over the top of a page: one button per option, and the chosen one is
pressed. It is its own zone for the remote, entered with Up from normal mode, where Left and
Right walk the options and OK picks one. Only the buttons take clicks, so the page under the
bar stays reachable between them.
-->

<div
    data-zone="up"
    role="group"
    aria-label={label}
    class="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-wrap justify-center gap-2 p-4
        *:pointer-events-auto"
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
