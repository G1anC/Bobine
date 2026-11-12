export type Cell = { col: number; row: number };

const MIN_TILE = 140;
const MAX_TILE = 280;
const TILES_ACROSS = 5.5;

/** `value` folded into `0..count-1`, for negative values too. */
export function wrap(value: number, count: number): number {
    return ((value % count) + count) % count;
}

/**
 * The item shown in a cell of the endless wall. The catalogue repeats along every row, and
 * each row starts half a catalogue further, so a title never sits right under itself.
 */
export function itemAt<T>(items: T[], cell: Cell): T {
    const shift = Math.floor(items.length / 2);
    return items[wrap(cell.col + cell.row * shift, items.length)];
}

/** The cell closest to a position on the wall, which is counted in cells and can be fractional. */
export function nearestCell(position: Cell): Cell {
    return { col: Math.round(position.col), row: Math.round(position.row) };
}

/**
 * Every cell that shows, even partly, in a window `cols` wide and `rows` high centred on
 * `centre`. All three are counted in cells. Only these cells are drawn, which is what lets
 * the wall go on for ever.
 */
export function visibleCells(centre: Cell, cols: number, rows: number): Cell[] {
    const cells: Cell[] = [];
    for (let row = Math.floor(centre.row - rows / 2); row <= Math.ceil(centre.row + rows / 2); row++) {
        for (let col = Math.floor(centre.col - cols / 2); col <= Math.ceil(centre.col + cols / 2); col++) {
            cells.push({ col, row });
        }
    }
    return cells;
}

/** The width of a tile for a wall `width` pixels wide: about five and a half fit across. */
export function tileWidth(width: number): number {
    return Math.round(Math.min(MAX_TILE, Math.max(MIN_TILE, width / TILES_ACROSS)));
}
