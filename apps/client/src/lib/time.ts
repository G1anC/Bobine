/** A running time in words: `45 s`, `9 min`, `1 h 35 min`. */
export function formatDuration(seconds: number): string {
    if (seconds < 60) return `${Math.round(seconds)} s`;
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const rest = minutes % 60;
    return rest === 0 ? `${Math.floor(minutes / 60)} h` : `${Math.floor(minutes / 60)} h ${rest} min`;
}

/** A playback position as a clock: `1:05`, or `1:02:03` past the hour. */
export function clock(seconds: number): string {
    const total = Math.max(0, Math.floor(seconds));
    const pad = (value: number) => String(value).padStart(2, '0');
    const minutes = Math.floor(total / 60) % 60;
    const hours = Math.floor(total / 3600);
    return hours > 0 ? `${hours}:${pad(minutes)}:${pad(total % 60)}` : `${minutes}:${pad(total % 60)}`;
}
