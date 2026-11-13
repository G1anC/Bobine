import { describe, expect, it } from 'vitest';
import { CHANGES, GLYPHS, waveFrame, waveSteps } from './scramble';

function scrambled(text: string, step: number): number[] {
    const shown = [...waveFrame(text, step)];
    return shown.flatMap((char, index) => (char === [...text][index] ? [] : [index]));
}

describe('scramble', () => {
    const text = 'abcdefgh';

    it('leaves the text whole before the wave and once it has passed', () => {
        expect(waveFrame(text, -1)).toBe(text);
        expect(waveFrame(text, waveSteps(text))).toBe(text);
    });

    it('starts on the first character alone', () => {
        expect(scrambled(text, 0)).toEqual([0]);
    });

    it('keeps three characters scrambling as it crosses the text', () => {
        expect(scrambled(text, 2)).toEqual([0, 1, 2]);
        expect(scrambled(text, 5)).toEqual([3, 4, 5]);
    });

    it('lets the last characters finish after the wave has left the others', () => {
        expect(scrambled(text, text.length + CHANGES - 2)).toEqual([text.length - 1]);
    });

    it('scrambles with glyphs only, and never a space', () => {
        const shown = waveFrame('a b c', 2);
        expect(shown).toHaveLength(5);
        expect(shown[1]).toBe(' ');
        expect(GLYPHS).toContain(shown[0]);
        expect(GLYPHS).toContain(shown[2]);
    });
});
