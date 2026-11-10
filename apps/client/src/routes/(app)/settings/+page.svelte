<script lang="ts">
    import { Button, SettingsRow, SettingsSection, THEMES, type Theme } from '@facile/muse';
    import { goto } from '$app/navigation';
    import { session, signOut } from '$lib/session.svelte';
    import { appearance, saveTheme } from '$lib/theme.svelte';
    import { canHandOff, handOffEnabled, setHandOff } from '$lib/vlc';

    const themeNames: Record<Theme, string> = { system: 'System', light: 'Light', dark: 'Dark' };

    let vlc = $state(handOffEnabled());

    function toggleVlc() {
        vlc = !vlc;
        setHandOff(vlc);
    }

    async function leave() {
        await signOut();
        await goto('/login', { replaceState: true });
    }
</script>

<svelte:head><title>Settings · Bobine</title></svelte:head>

<div class="flex max-w-3xl flex-col gap-10">
    <h1 class="text-fc-2xl font-semibold text-fc-fg">Settings</h1>

    <SettingsSection title="Account">
        <SettingsRow label="Name">
            <span class="text-fc-sm text-fc-fg">{session.user?.name || 'Not set'}</span>
        </SettingsRow>
        <SettingsRow label="Email">
            <span class="text-fc-sm text-fc-fg">{session.user?.email}</span>
        </SettingsRow>
        <SettingsRow label="Session">
            <Button size="lg" variant="danger" onclick={leave}>Sign out</Button>
        </SettingsRow>
    </SettingsSection>

    <SettingsSection title="Appearance">
        <SettingsRow label="Theme" description="System follows the setting of this device.">
            {#each THEMES as theme (theme)}
                <Button
                    size="lg"
                    variant={appearance.theme === theme ? 'primary' : 'secondary'}
                    aria-pressed={appearance.theme === theme}
                    onclick={() => saveTheme(theme)}
                >
                    {themeNames[theme]}
                </Button>
            {/each}
        </SettingsRow>
    </SettingsSection>

    <SettingsSection title="Playback">
        <SettingsRow
            label="Open videos in VLC"
            description={canHandOff()
                ? 'Videos open in the VLC installed on this device. Turn it off to play them inside Bobine.'
                : 'Only in the desktop and Android apps. A browser tab always plays videos inside Bobine.'}
        >
            <Button size="lg" variant="secondary" aria-pressed={vlc} disabled={!canHandOff()} onclick={toggleVlc}>
                {vlc ? 'On' : 'Off'}
            </Button>
        </SettingsRow>
    </SettingsSection>

    <SettingsSection title="Credits">
        <SettingsRow label="Sample catalogue" description="Openly licensed works streamed from the Internet Archive." />
        <SettingsRow label="Icons" description="Iconoir by Luca Burgio, MIT licence." />
    </SettingsSection>
</div>
