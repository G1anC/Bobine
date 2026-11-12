<script lang="ts">
    import { EmptyState } from '@facile/muse';
    import FilterBar from '$lib/components/FilterBar.svelte';
    import Mosaic from '$lib/components/Mosaic.svelte';
    import { decadeOf, decadesOf } from '$lib/decades';
    import { appIcons } from '$lib/icons';
    import { library } from '$lib/library';

    let decade = $state<number | null>(null);
</script>

<svelte:head><title>Movies · Bobine</title></svelte:head>

<h1 class="sr-only">Movies</h1>
{#await library.list('movie') then movies}
    {#if movies.length > 0}
        <Mosaic items={decade === null ? movies : movies.filter((movie) => decadeOf(movie.year) === decade)} />
        <FilterBar
            label="Filter movies by decade"
            options={[
                { label: 'All', value: null },
                ...decadesOf(movies).map((start) => ({ label: `${start}s`, value: start }))
            ]}
            bind:value={decade}
        />
    {:else}
        <EmptyState icon={appIcons.movies} title="No movies yet" />
    {/if}
{/await}
