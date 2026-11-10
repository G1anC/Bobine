<script lang="ts">
	import { EmptyState } from '@facile/muse';

	let { title, icon, empty }: { title: string; icon: string; empty: string } = $props();
</script>

<!--
@component
A titled row of media tiles. It renders its empty state until the library has items to show.
-->

<section class="flex flex-col gap-4" aria-label={title}>
	<h2 class="text-fc-lg font-semibold text-fc-fg">{title}</h2>
	<EmptyState {icon} title={empty} />
</section>
