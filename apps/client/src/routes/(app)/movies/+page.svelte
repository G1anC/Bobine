<script lang="ts">
    import { onMount } from 'svelte';
    import Shelf from '$lib/components/Shelf.svelte';
    import { decadeOf, decadesOf } from '$lib/decades';
    import { appIcons } from '$lib/icons';
    import { library } from '$lib/library';
    import { topBar } from '$lib/topBar.svelte';

    const loading = library.list('movie');
    const decade = $derived(topBar.filter?.value ? Number(topBar.filter.value) : null);

    onMount(() => {
        let here = true;
        void loading.then((movies) => {
            if (!here) return;
            topBar.filter = {
                label: 'Filter movies by decade',
                icon: appIcons.date,
                options: [
                    { label: 'All', value: '' },
                    ...decadesOf(movies).map((start) => ({ label: `${start}`, value: `${start}` }))
                ],
                value: ''
            };
        });
        return () => {
            here = false;
            topBar.filter = null;
        };
    });
</script>

<svelte:head><title>Movies · Bobine</title></svelte:head>

<div class="flex flex-col gap-10">
    <h1 class="text-fc-2xl font-semibold text-fc-fg">Movies</h1>
    {#await loading then movies}
        <Shelf
            title={decade === null ? 'All movies' : `Movies of the ${decade}s`}
            icon={appIcons.movies}
            empty="No movies yet"
            items={decade === null ? movies : movies.filter((movie) => decadeOf(movie.year) === decade)}
            layout="grid"
        />
    {/await}
</div>
