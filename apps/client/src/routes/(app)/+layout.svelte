<script lang="ts">
	import { MobileNav, SideBar, Spinner, type Theme } from '@facile/muse';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { BOBINE_ICON, appIcons } from '$lib/icons';
	import { session, signOut } from '$lib/session.svelte';
	import { saveTheme, storedTheme } from '$lib/theme';

	let { children } = $props();

	let theme = $state<Theme>(storedTheme());

	$effect(() => {
		if (session.status === 'ready' && !session.user) void goto('/login', { replaceState: true });
	});

	const path = $derived(page.url.pathname);
	const pages = $derived([
		{ label: 'Home', href: '/', icon: appIcons.home, active: path === '/' },
		{ label: 'Movies', href: '/movies', icon: appIcons.movies, active: path.startsWith('/movies') },
		{ label: 'Shows', href: '/shows', icon: appIcons.shows, active: path.startsWith('/shows') }
	]);
	const user = $derived(
		session.user
			? { name: session.user.name.trim() || session.user.email, email: session.user.email, avatar: session.user.avatar_url }
			: undefined
	);
	const userMenu = $derived({
		theme,
		onThemeChange: (next: Theme) => {
			theme = next;
			saveTheme(next);
		},
		onSignOut: async () => {
			await signOut();
			await goto('/login', { replaceState: true });
		}
	});
</script>

{#if session.user}
	<div class="flex h-dvh overflow-hidden bg-fc-page">
		<SideBar class="hidden md:flex" icon={BOBINE_ICON} title="Bobine" {pages} {user} {userMenu} />
		<main id="main" class="relative flex-1 overflow-y-auto overscroll-contain px-4 pt-6 pb-28 md:px-10 md:pt-10 md:pb-10">
			{@render children()}
		</main>
		<MobileNav class="md:hidden" items={pages} {user} {userMenu} />
	</div>
{:else if session.status === 'offline'}
	<div class="flex min-h-dvh items-center justify-center bg-fc-page px-4 text-center text-fc-sm text-fc-fg-muted">
		Bobine cannot reach its server. Check the connection and reopen the app.
	</div>
{:else}
	<div class="flex min-h-dvh items-center justify-center bg-fc-page">
		<Spinner />
	</div>
{/if}
