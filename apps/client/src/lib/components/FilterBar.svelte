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
A row of filters on a blurred card, like the menu: one button per option, and the chosen one
is pressed. It is its own zone for the remote, entered with Up from normal mode, where Left
and Right walk the options and OK picks one.
-->

<div
    data-zone="up"
    role="group"
    aria-label={label}
    class="flex flex-wrap gap-2 self-start rounded-fc-lg bg-fc-component/80 p-2 backdrop-blur-xl"
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
