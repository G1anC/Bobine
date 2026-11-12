<script lang="ts">
	import { Button, MobileNav, SideBar, Spinner } from '@facile/muse';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { BOBINE_ICON, appIcons } from '$lib/icons';
	import { loadSession, session, signOut } from '$lib/session.svelte';
	import { appearance, saveTheme } from '$lib/theme.svelte';

	let { children } = $props();

	$effect(() => {
		if (session.status === 'ready' && !session.user) void goto('/login', { replaceState: true });
	});

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
	const user = $derived(
		session.user
			? { name: session.user.name.trim() || session.user.email, email: session.user.email, avatar: session.user.avatar_url }
			: undefined
	);
	const userMenu = $derived({
		theme: appearance.theme,
		onThemeChange: saveTheme,
		settingsHref: '/settings',
		onSignOut: async () => {
			await signOut();
			await goto('/login', { replaceState: true });
		}
	});
</script>

{#if session.user}
	<div class="relative h-dvh overflow-hidden bg-fc-page">
		<SideBar
			class="absolute top-4 bottom-4 left-4 z-30 hidden h-auto bg-fc-component/80 backdrop-blur-xl md:flex"
			data-zone="left"
			icon={BOBINE_ICON}
			title="Bobine"
			{pages}
			{user}
			{userMenu}
		/>
		<main
			id="main"
			data-zone="main"
			class="absolute inset-0 overflow-y-auto overscroll-contain px-4 pt-6 pb-28 md:pt-10 md:pr-10 md:pb-10 md:pl-68"
		>
			{@render children()}
		</main>
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
