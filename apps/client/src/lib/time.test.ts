import { describe, expect, it } from 'vitest';
import { clock, formatDuration } from './time';

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

describe('clock', () => {
    it('shows minutes and padded seconds', () => {
        expect(clock(0)).toBe('0:00');
        expect(clock(65.9)).toBe('1:05');
    });

    it('adds hours past the hour', () => {
        expect(clock(3723)).toBe('1:02:03');
    });

    it('never goes below zero', () => {
        expect(clock(-4)).toBe('0:00');
    });
});
