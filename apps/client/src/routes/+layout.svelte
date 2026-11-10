<script lang="ts">
	import '../app.css';
	import { provideLocale } from '@facile/muse';
	import { onMount } from 'svelte';
	import { registerAppIcons } from '$lib/icons';
	import { loadSession } from '$lib/session.svelte';
	import { registerRemote } from '$lib/tv/remote';
	import { loadTheme } from '$lib/theme.svelte';

	let { children } = $props();

	provideLocale(() => navigator.language);
	registerAppIcons();

	onMount(() => {
		loadTheme();
		void loadSession();
		return registerRemote();
	});
</script>

{@render children()}
