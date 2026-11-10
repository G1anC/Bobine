import { describe, expect, it } from 'vitest';
import { formatDuration } from './time';

describe('formatDuration', () => {
    it('keeps seconds under a minute', () => {
        expect(formatDuration(45)).toBe('45 s');
    });

    it('rounds to minutes under an hour', () => {
        expect(formatDuration(597)).toBe('10 min');
        expect(formatDuration(90)).toBe('2 min');
    });

    it('splits hours and minutes, and drops a zero remainder', () => {
        expect(formatDuration(5753)).toBe('1 h 36 min');
        expect(formatDuration(7200)).toBe('2 h');
    });
});
