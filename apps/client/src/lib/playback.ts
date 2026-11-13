import type { MediaItem, Track } from '$lib/library';

/** The track a player page should play: the one asked for, or the first when it is unknown. */
export function pickTrack(item: MediaItem, id: string | null): Track {
    return item.tracks.find((track) => track.id === id) ?? item.tracks[0];
}

/** The track `step` places away from `id`, or undefined past either end of the list. */
export function neighbour(item: MediaItem, id: string, step: -1 | 1): Track | undefined {
    const index = item.tracks.findIndex((track) => track.id === id);
    return index < 0 ? undefined : item.tracks[index + step];
}

/** A new playback position `step` seconds away, kept between the start and the end. */
export function seekTo(position: number, step: number, length: number): number {
    return Math.min(Math.max(position + step, 0), length);
}
