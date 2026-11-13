<script lang="ts">
	import { Button, MobileNav, Spinner, icons } from '@facile/muse';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import KeyHints from '$lib/components/KeyHints.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import { appIcons } from '$lib/icons';
	import { loadSession, session, signOut } from '$lib/session.svelte';
	import { appearance, saveTheme } from '$lib/theme.svelte';
	import { topBar } from '$lib/topBar.svelte';
	import { focused, watchZone } from '$lib/tv/zone.svelte';

	let { children } = $props();

	$effect(() => {
		if (session.status === 'ready' && !session.user) void goto('/login', { replaceState: true });
	});

	$effect(() => watchZone());

	const path = $derived(page.url.pathname);
	const pages = $derived([
		{ label: 'Home', href: '/', icon: appIcons.home, active: path === '/' },
		{ label: 'Movies', href: '/movies', icon: appIcons.movies, active: path.startsWith('/movies') },
		{ label: 'Shows', href: '/shows', icon: appIcons.shows, active: path.startsWith('/shows') },
		{ label: 'Music', href: '/music', icon: appIcons.music, active: path.startsWith('/music') },
		{
			label: 'Podcasts',
			href: '/podcasts',
			icon: appIcons.podcasts,
			active: path.startsWith('/podcasts')
		}
	]);
	const menu = $derived([
		...pages,
		{ label: 'Settings', href: '/settings', icon: icons.settings, active: path.startsWith('/settings') }
	]);
	const user = $derived(
		session.user
			? { name: session.user.name.trim() || session.user.email, email: session.user.email, avatar: session.user.avatar_url }
			: undefined
	);
	async function leave() {
		await signOut();
		await goto('/login', { replaceState: true });
	}
	const userMenu = $derived({
		theme: appearance.theme,
		onThemeChange: saveTheme,
		settingsHref: '/settings',
		onSignOut: leave
	});
</script>

{#if session.user}
	<div class="relative flex h-dvh w-screen flex-col overflow-hidden bg-shell p-1 ">
		<TopBar onSignOut={leave} />
		<SideBar items={menu} />
		<main
			id="main"
			data-zone="main"
			class="relative min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain rounded-3xl bg-panel px-4 pt-6 pb-28 md:p-10"
		>
			{@render children()}
		</main>
		<KeyHints zone={focused.zone} hasFilter={topBar.filter !== null} />
		<MobileNav class="md:hidden" data-zone="left" items={pages} {user} {userMenu} />
	</div>
{:else if session.status === 'offline'}
	<div class="flex min-h-dvh flex-col items-center justify-center gap-6 bg-fc-page px-4 text-center">
		<p role="alert" class="text-fc-sm text-fc-fg-muted">
			Bobine cannot reach its server. Check the connection, then try again.
		</p>
		<Button size="lg" icon={appIcons.retry} onclick={loadSession}>Try again</Button>
	</div>
{:else}
	<div class="flex min-h-dvh items-center justify-center bg-fc-page">
		<Spinner />
	</div>
{/if}
