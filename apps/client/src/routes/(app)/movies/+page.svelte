<script lang="ts">
    import FilterBar from '$lib/components/FilterBar.svelte';
    import Shelf from '$lib/components/Shelf.svelte';
    import { decadeOf, decadesOf } from '$lib/decades';
    import { appIcons } from '$lib/icons';
    import { library } from '$lib/library';

    let decade = $state<number | null>(null);
</script>

<svelte:head><title>Movies · Bobine</title></svelte:head>

<div class="flex flex-col gap-10">
    <h1 class="text-fc-2xl font-semibold text-fc-fg">Movies</h1>
    {#await library.list('movie') then movies}
        <FilterBar
            label="Filter movies by decade"
            options={[
                { label: 'All', value: null },
                ...decadesOf(movies).map((start) => ({ label: `${start}s`, value: start }))
            ]}
            bind:value={decade}
        />
        <Shelf
            title={decade === null ? 'All movies' : `Movies of the ${decade}s`}
            icon={appIcons.movies}
            empty="No movies yet"
            items={decade === null ? movies : movies.filter((movie) => decadeOf(movie.year) === decade)}
            layout="grid"
        />
    {/await}
</div>
