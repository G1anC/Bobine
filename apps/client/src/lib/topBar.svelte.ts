/**
 * A filter a page asks the top bar to show: a dropdown of options, the chosen value, and an
 * optional icon that says what the filter is about.
 */
export type TopFilter = {
    label: string;
    icon?: string;
    options: { label: string; value: string }[];
    value: string;
};

/** What the top bar shows for the current page. A page sets `filter` and clears it on leaving. */
export const topBar = $state<{ filter: TopFilter | null }>({ filter: null });
