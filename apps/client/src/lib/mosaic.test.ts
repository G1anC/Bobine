import { describe, expect, it } from 'vitest';
import { itemAt, nearestCell, tileWidth, visibleCells, wrap } from './mosaic';

describe('mosaic', () => {
    it('folds any number into the catalogue, negative ones too', () => {
        expect(wrap(2, 5)).toBe(2);
        expect(wrap(5, 5)).toBe(0);
        expect(wrap(-1, 5)).toBe(4);
        expect(wrap(-11, 5)).toBe(4);
    });

    it('repeats the catalogue along a row without end', () => {
        const items = ['a', 'b', 'c', 'd', 'e'];
        expect(itemAt(items, { col: 0, row: 0 })).toBe('a');
        expect(itemAt(items, { col: 5, row: 0 })).toBe('a');
        expect(itemAt(items, { col: -1, row: 0 })).toBe('e');
        expect(itemAt(items, { col: 1_000_003, row: 0 })).toBe('d');
    });

    it('never puts a title right under itself', () => {
        const items = ['a', 'b', 'c', 'd', 'e'];
        for (let row = -3; row <= 3; row++) {
            expect(itemAt(items, { col: 0, row })).not.toBe(itemAt(items, { col: 0, row: row + 1 }));
        }
    });

    it('still answers with a single title', () => {
        expect(itemAt(['only'], { col: -7, row: 12 })).toBe('only');
    });

    it('snaps a position to its closest cell', () => {
        expect(nearestCell({ col: 2.4, row: -1.6 })).toEqual({ col: 2, row: -2 });
    });

    it('lists the cells around the centre, with a spare ring so no gap shows', () => {
        const cells = visibleCells({ col: 10, row: -4 }, 2, 0);
        expect(cells).toEqual([
            { col: 9, row: -4 },
            { col: 10, row: -4 },
            { col: 11, row: -4 }
        ]);
        expect(visibleCells({ col: 0.5, row: 0.5 }, 4, 2)).toHaveLength(6 * 4);
    });

    it('sizes tiles to the wall within bounds', () => {
        expect(tileWidth(360)).toBe(140);
        expect(tileWidth(1100)).toBe(200);
        expect(tileWidth(3840)).toBe(280);
    });
});
