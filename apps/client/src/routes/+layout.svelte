<script lang="ts">
	import '../app.css';
	import { provideLocale } from '@facile/muse';
	import { onMount } from 'svelte';
	import { registerAppIcons } from '$lib/icons';
	import { language, loadLocale } from '$lib/locale.svelte';
	import { loadSession } from '$lib/session.svelte';
	import { registerRemote } from '$lib/tv/remote';
	import { loadTheme } from '$lib/theme.svelte';

	let { children } = $props();

	provideLocale(() => language.locale ?? navigator.language);
	registerAppIcons();

	onMount(() => {
		loadTheme();
		loadLocale();
		void loadSession();
		const stopRemote = registerRemote();
		return () => {
			stopRemote();
		};
	});
</script>

{@render children()}
