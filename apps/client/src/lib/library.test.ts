import { describe, expect, it } from 'vitest';
import { isVideo, library } from './library';

describe('library', () => {
    it('lists only the kind it is asked for', async () => {
        const movies = await library.list('movie');
        expect(movies.length).toBeGreaterThan(0);
        expect(movies.every((item) => item.kind === 'movie')).toBe(true);
    });

    it('knows which kinds have a picture', () => {
        expect(isVideo('movie')).toBe(true);
        expect(isVideo('show')).toBe(true);
        expect(isVideo('album')).toBe(false);
        expect(isVideo('podcast')).toBe(false);
    });

    it('holds at least one title of every kind', async () => {
        for (const kind of ['movie', 'show', 'album', 'podcast'] as const) {
            expect((await library.list(kind)).length).toBeGreaterThan(0);
        }
    });

    it('finds a title by its id and answers undefined for an unknown one', async () => {
        expect((await library.get('sintel'))?.title).toBe('Sintel');
        expect(await library.get('no-such-title')).toBeUndefined();
    });

    it('gives every title a unique id', async () => {
        const ids = (await library.all()).map((item) => item.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('credits every title and names its licence', async () => {
        for (const item of await library.all()) {
            expect(item.credit).not.toBe('');
            expect(item.license).not.toBe('');
            expect(item.licenseUrl).toMatch(/^https:\/\/creativecommons\.org\//);
        }
    });

    it('points a poster at Wikimedia Commons and leaves a title without one bare', async () => {
        expect((await library.get('sintel'))?.image).toBe(
            'https://commons.wikimedia.org/wiki/Special:FilePath/Sintel%20poster.jpg?width=500'
        );
        expect((await library.get('jazz-sampler'))?.image).toBeUndefined();
    });

    it('streams every track over https from the Internet Archive, without raw spaces', async () => {
        for (const item of await library.all()) {
            expect(item.tracks.length).toBeGreaterThan(0);
            for (const track of item.tracks) {
                expect(track.url).toMatch(/^https:\/\/archive\.org\/download\/\S+$/);
            }
        }
    });
});
