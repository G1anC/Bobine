import { describe, expect, it } from 'vitest';
import { library } from './library';

describe('library', () => {
    it('lists only the kind it is asked for', async () => {
        const movies = await library.list('movie');
        expect(movies.length).toBeGreaterThan(0);
        expect(movies.every((item) => item.kind === 'movie')).toBe(true);
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

    it('streams every track over https from the Internet Archive, without raw spaces', async () => {
        for (const item of await library.all()) {
            expect(item.tracks.length).toBeGreaterThan(0);
            for (const track of item.tracks) {
                expect(track.url).toMatch(/^https:\/\/archive\.org\/download\/\S+$/);
            }
        }
    });
});
