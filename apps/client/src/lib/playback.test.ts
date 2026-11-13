import { describe, expect, it } from 'vitest';
import { library } from './library';
import { neighbour, pickTrack, seekTo } from './playback';

const show = (await library.get('caminandes'))!;

describe('playback', () => {
    it('picks the track asked for, and the first one otherwise', () => {
        expect(pickTrack(show, 'llamigos').id).toBe('llamigos');
        expect(pickTrack(show, null).id).toBe('llama-drama');
        expect(pickTrack(show, 'unknown').id).toBe('llama-drama');
    });

    it('finds the tracks on either side and stops at the ends', () => {
        expect(neighbour(show, 'gran-dillama', -1)?.id).toBe('llama-drama');
        expect(neighbour(show, 'gran-dillama', 1)?.id).toBe('llamigos');
        expect(neighbour(show, 'llama-drama', -1)).toBeUndefined();
        expect(neighbour(show, 'llamigos', 1)).toBeUndefined();
        expect(neighbour(show, 'unknown', 1)).toBeUndefined();
    });

    it('keeps a seek between the start and the end', () => {
        expect(seekTo(30, -15, 100)).toBe(15);
        expect(seekTo(5, -15, 100)).toBe(0);
        expect(seekTo(95, 15, 100)).toBe(100);
    });
});
