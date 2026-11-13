/** The decade a year falls in: 1968 gives 1960. */
export function decadeOf(year: number): number {
    return Math.floor(year / 10) * 10;
}

/** Every decade that holds at least one of the items, oldest first, each one once. */
export function decadesOf(items: { year: number }[]): number[] {
    return [...new Set(items.map((item) => decadeOf(item.year)))].sort((a, b) => a - b);
}
