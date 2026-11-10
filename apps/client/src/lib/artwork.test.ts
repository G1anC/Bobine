import { describe, expect, it } from 'vitest';
import { TINTS, tintOf } from './artwork';

describe('tintOf', () => {
    it('gives the same title the same tint every time', () => {
        expect(tintOf('Sintel')).toBe(tintOf('Sintel'));
    });

    it('stays inside the palette, even for an empty title', () => {
        for (const title of ['', 'Sintel', 'Big Buck Bunny', 'Nuit étoilée']) {
            expect(tintOf(title)).toBeGreaterThanOrEqual(0);
            expect(tintOf(title)).toBeLessThan(TINTS);
        }
    });

    it('spreads different titles over more than one tint', () => {
        const tints = new Set(['Sintel', 'Big Buck Bunny', 'Elephants Dream', 'Caminandes'].map(tintOf));
        expect(tints.size).toBeGreaterThan(1);
    });
});
