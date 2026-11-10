export type Direction = 'up' | 'down' | 'left' | 'right';

export type Box = { left: number; top: number; right: number; bottom: number };

const KEYS: Record<string, Direction> = {
	ArrowUp: 'up',
	ArrowDown: 'down',
	ArrowLeft: 'left',
	ArrowRight: 'right'
};

const OFF_AXIS_WEIGHT = 3;
const OUT_OF_LINE = 100_000;

/** The direction a key moves focus in, or null for any other key. */
export function directionOf(key: string): Direction | null {
	return KEYS[key] ?? null;
}

/**
 * How far `to` lies from `from` in `direction`, or null when it is not in that direction at
 * all. A box sharing the row or column always beats one that does not, so focus walks a row
 * of tiles before it jumps to the next one. Outside the line, drift across the axis counts
 * three times the distance along it.
 */
export function distance(from: Box, to: Box, direction: Direction): number | null {
	const horizontal = direction === 'left' || direction === 'right';
	const along = {
		up: from.top - to.bottom,
		down: to.top - from.bottom,
		left: from.left - to.right,
		right: to.left - from.right
	}[direction];
	if (along < -1) return null;
	const across = horizontal
		? Math.max(0, to.top - from.bottom, from.top - to.bottom)
		: Math.max(0, to.left - from.right, from.left - to.right);
	return Math.max(0, along) + (across > 0 ? OUT_OF_LINE + across * OFF_AXIS_WEIGHT : 0);
}

/** The index of the closest box in `direction`, or -1 when nothing lies that way. */
export function nearest(from: Box, candidates: Box[], direction: Direction): number {
	let best = -1;
	let bestScore = Infinity;
	candidates.forEach((box, index) => {
		const score = distance(from, box, direction);
		if (score !== null && score < bestScore) {
			best = index;
			bestScore = score;
		}
	});
	return best;
}
