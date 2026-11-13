import { describe, expect, it } from 'vitest';
import { decadeOf, decadesOf } from './decades';

describe('decades', () => {
    it('finds the decade of a year', () => {
        expect(decadeOf(1968)).toBe(1960);
        expect(decadeOf(2010)).toBe(2010);
        expect(decadeOf(2019)).toBe(2010);
    });

    it('lists each decade once, oldest first', () => {
        expect(decadesOf([{ year: 2012 }, { year: 1968 }, { year: 2010 }, { year: 2006 }])).toEqual([1960, 2000, 2010]);
        expect(decadesOf([])).toEqual([]);
    });
});
