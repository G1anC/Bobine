<script lang="ts">
    import { Icon, LocaleSwitch, Select, type Theme } from '@facile/muse';
    import RollFace from '$lib/components/RollFace.svelte';
    import { BOBINE_ICON, appIcons } from '$lib/icons';
    import { saveLocale } from '$lib/locale.svelte';
    import { appearance, saveTheme } from '$lib/theme.svelte';
    import { topBar } from '$lib/topBar.svelte';

    let { onSignOut }: { onSignOut: () => void } = $props();

    const themes: { label: string; value: Theme; icon: string }[] = [
        { label: 'Light theme', value: 'light', icon: appIcons.light },
        { label: 'Dark theme', value: 'dark', icon: appIcons.dark }
    ];

    const pill = 'flex rounded-[24px] bg-shell p-1';
    const segment =
        'flex h-8 min-w-8 items-center justify-center rounded-[18px] px-2.5 text-fc-sm outline-offset-2 outline-shell-fg transition-colors focus-visible:outline-solid motion-reduce:transition-none';
    const idle = 'text-shell-fg/60 hover:bg-shell-fg/10 hover:text-shell-fg focus-visible:text-shell-fg';
    const roll =
        'relative isolate flex h-8 min-w-8 items-center justify-center overflow-hidden rounded-[18px] px-2.5 text-fc-sm text-shell-fg outline-offset-2 outline-shell-fg focus-visible:outline-solid';
</script>

<!--
@component
The bar fixed over the top of the app: Bobine's mark on the left, and on the right one pill to
pick the language, one to pick a light or dark theme and one to sign out. The language is
remembered and already drives the texts of the component library; the app's own texts are
not translated yet. When the page asks for a filter through
`topBar.filter`, it hangs in the middle as a dropdown on a tab of the page frame. The bar is
the `top` zone for the remote and the filter the `up` zone: Up from normal mode enters the
filter when there is one, and Up again climbs to the bar.
-->

<header data-zone="top" class="fixed top-0 left-0 w-full z-50 flex h-13 shrink-0 items-center justify-between gap-12 px-2.5 pt-2 text-shell-fg">
    <a
        href="/"
        aria-label="Bobine, home"
        class="flex size-11 items-center justify-center rounded-full outline-offset-2 pl-2 outline-shell-fg focus-visible:outline-solid"
    >
        <Icon icon={BOBINE_ICON} size={40} />
    </a>
    {#if topBar.filter}
        <div data-zone="up" class="group merge-top absolute top-1 left-1/2 -translate-x-1/2 rounded-b-3xl bg-shell pb-1 px-2">
            {#if topBar.filter.icon}
                <Icon
                    icon={topBar.filter.icon}
                    size={16}
                    class="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-shell-fg/60 transition-colors
                        group-focus-within:text-shell-fg group-hover:text-shell-fg motion-reduce:transition-none"
                />
            {/if}
            <Select
                aria-label={topBar.filter.label}
                options={topBar.filter.options}
                bind:value={topBar.filter.value}
                class="{segment} {idle} w-auto gap-1 bg-transparent {topBar.filter.icon ? 'pl-8' : ''}"
            />
        </div>
    {/if}
    <div class="hidden items-center gap-8 md:flex">
        <div class={pill}>
            <LocaleSwitch onChange={saveLocale} class="{segment} {idle} w-auto gap-1 bg-transparent" />
        </div>
        <div role="group" aria-label="Theme" class={pill}>
            {#each themes as theme (theme.value)}
                <button
                    type="button"
                    aria-label={theme.label}
                    aria-pressed={appearance.theme === theme.value}
                    class={roll}
                    onclick={() => saveTheme(theme.value)}
                >
                    <RollFace icon={theme.icon} />
                </button>
            {/each}
        </div>
        <div role="group" aria-label="Account" class={pill}>
            <button type="button" class={roll} onclick={onSignOut}>
                <RollFace icon={appIcons.signOut} label="Sign out" />
            </button>
        </div>
    </div>
</header>
