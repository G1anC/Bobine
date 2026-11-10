import { describe, expect, it } from 'vitest';
import { directionOf, nearest, type Box } from './spatial';

const tile = (column: number, row: number): Box => ({
	left: column * 110,
	top: row * 110,
	right: column * 110 + 100,
	bottom: row * 110 + 100
});

const grid = [tile(0, 0), tile(1, 0), tile(2, 0), tile(0, 1), tile(1, 1), tile(2, 1)];

describe('spatial navigation', () => {
	it('maps the arrow keys and ignores the rest', () => {
		expect(directionOf('ArrowLeft')).toBe('left');
		expect(directionOf('Enter')).toBeNull();
	});

	it('moves to the neighbour in the same row or column', () => {
		expect(nearest(grid[1], grid, 'right')).toBe(2);
		expect(nearest(grid[1], grid, 'left')).toBe(0);
		expect(nearest(grid[1], grid, 'down')).toBe(4);
		expect(nearest(grid[4], grid, 'up')).toBe(1);
	});

	it('finds nothing past the edge of the grid', () => {
		expect(nearest(grid[2], grid, 'right')).toBe(-1);
		expect(nearest(grid[0], grid, 'up')).toBe(-1);
	});

	it('prefers the same row over a closer diagonal', () => {
		const from = tile(0, 0);
		const sameRowFar = tile(3, 0);
		const diagonalNear = { left: 110, top: 150, right: 210, bottom: 250 };
		expect(nearest(from, [diagonalNear, sameRowFar], 'right')).toBe(1);
	});
});
