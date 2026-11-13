<script lang="ts">
    import RollFace from '$lib/components/RollFace.svelte';

    let { items }: { items: { label: string; href: string; icon: string; active: boolean }[] } = $props();
</script>

<!--
@component
The main menu on wide screens: a column of icon links on a tab that grows out of the left
side of the page frame. An icon is plain until its link is hovered, focused or the current
page, where it takes the colour of its page. Each link is named after its page for screen
readers, and the current page is marked. It is the `left` zone for the remote, entered with
Left from normal mode.
-->

<nav
    data-zone="left"
    aria-label="Main menu"
    class="merge-left absolute top-1/2 left-1 z-50 hidden -translate-y-1/2 flex-col gap-1 rounded-r-3xl bg-shell py-1 pr-1 md:flex"
>
    {#each items as item (item.href)}
        <a
            href={item.href}
            aria-label={item.label}
            aria-current={item.active ? 'page' : undefined}
            class="relative isolate flex size-11 items-center justify-center overflow-hidden rounded-full text-shell-fg/60
                outline-shell-fg [--roll-h:2.75rem] focus-visible:outline-solid"
        >
            <RollFace icon={item.icon} />
        </a>
    {/each}
</nav>
