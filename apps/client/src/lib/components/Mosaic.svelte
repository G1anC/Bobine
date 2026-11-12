<script lang="ts">
    import { cubicOut } from 'svelte/easing';
    import { Tween, prefersReducedMotion } from 'svelte/motion';
    import Artwork from '$lib/components/Artwork.svelte';
    import type { MediaItem, MediaKind } from '$lib/library';
    import { itemAt, nearestCell, tileWidth, visibleCells, type Cell } from '$lib/mosaic';
    import { clock } from '$lib/time';
    import { directionOf, type Direction } from '$lib/tv/spatial';

    let { items }: { items: MediaItem[] } = $props();

    const GAP = 16;
    const FRAME_MARGIN = 12;
    const FRAMED_SCALE = 1.3;
    const GLIDE_MS = 450;
    const SETTLE_MS = 160;
    const DRAG_START = 6;
    const THROW_MS = 120;
    const THROW_STALE_MS = 80;
    const MOVES: Record<Direction, Cell> = {
        up: { col: 0, row: -1 },
        down: { col: 0, row: 1 },
        left: { col: -1, row: 0 },
        right: { col: 1, row: 0 }
    };
    const KIND_LABELS: Record<MediaKind, string> = {
        movie: 'Film',
        show: 'Series',
        album: 'Album',
        podcast: 'Podcast'
    };
    const brackets = [
        'top-0 left-0 border-t-2 border-l-2 group-focus-visible:border-t-4 group-focus-visible:border-l-4',
        'top-0 right-0 border-t-2 border-r-2 group-focus-visible:border-t-4 group-focus-visible:border-r-4',
        'bottom-0 left-0 border-b-2 border-l-2 group-focus-visible:border-b-4 group-focus-visible:border-l-4',
        'bottom-0 right-0 border-b-2 border-r-2 group-focus-visible:border-b-4 group-focus-visible:border-r-4'
    ];

    let surface: HTMLElement;
    let width = $state(0);
    let height = $state(0);
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    let press: { x: number; y: number; time: number; vx: number; vy: number; dragging: boolean } | null = null;
    let dragged = false;

    const position = new Tween<Cell>({ col: 0, row: 0 }, { easing: cubicOut });

    const tile = $derived({ width: tileWidth(width), height: tileWidth(width) * 1.5 });
    const step = $derived({ x: tile.width + GAP, y: tile.height + GAP });
    const cells = $derived(visibleCells(position.current, width / step.x, height / step.y));
    const framed = $derived(nearestCell(position.current));
    const item = $derived(itemAt(items, framed));
    const runtime = $derived(clock(item.tracks.reduce((total, track) => total + track.seconds, 0)));

    function scaleOf(cell: Cell): number {
        const away = Math.max(Math.abs(cell.col - position.current.col), Math.abs(cell.row - position.current.row));
        return 1 + (FRAMED_SCALE - 1) * Math.max(0, 1 - away);
    }

    function glide(to: Cell): void {
        void position.set(to, { duration: prefersReducedMotion.current ? 0 : GLIDE_MS });
    }

    function pan(dx: number, dy: number): void {
        const from = position.target;
        void position.set({ col: from.col + dx / step.x, row: from.row + dy / step.y }, { duration: 0 });
    }

    function settle(): void {
        clearTimeout(settleTimer);
        glide(nearestCell(position.target));
    }

    function coast(vx: number, vy: number): void {
        const from = position.target;
        const carry = (speed: number, size: number) => Math.max(-1, Math.min(1, (speed * THROW_MS) / size));
        glide(nearestCell({ col: from.col + carry(vx, step.x), row: from.row + carry(vy, step.y) }));
    }

    function onwheel(event: WheelEvent): void {
        pan(event.deltaX, event.deltaY);
        clearTimeout(settleTimer);
        settleTimer = setTimeout(settle, SETTLE_MS);
    }

    function onkeydown(event: KeyboardEvent): void {
        const direction = directionOf(event.key);
        if (!direction) return;
        event.preventDefault();
        const from = nearestCell(position.target);
        glide({ col: from.col + MOVES[direction].col, row: from.row + MOVES[direction].row });
    }

    function onpointerdown(event: PointerEvent): void {
        if (event.button !== 0) return;
        dragged = false;
        press = { x: event.clientX, y: event.clientY, time: event.timeStamp, vx: 0, vy: 0, dragging: false };
    }

    function onpointermove(event: PointerEvent): void {
        if (!press) return;
        const dx = event.clientX - press.x;
        const dy = event.clientY - press.y;
        if (!press.dragging && Math.hypot(dx, dy) < DRAG_START) return;
        if (!press.dragging) surface.setPointerCapture(event.pointerId);
        const elapsed = Math.max(1, event.timeStamp - press.time);
        press = {
            x: event.clientX,
            y: event.clientY,
            time: event.timeStamp,
            vx: (press.vx - dx / elapsed) / 2,
            vy: (press.vy - dy / elapsed) / 2,
            dragging: true
        };
        pan(-dx, -dy);
    }

    function onpointerup(event: PointerEvent): void {
        const released = press;
        press = null;
        dragged = released?.dragging ?? false;
        if (!released || !dragged) return;
        const moving = event.timeStamp - released.time < THROW_STALE_MS;
        coast(moving ? released.vx : 0, moving ? released.vy : 0);
    }

    function onclick(event: MouseEvent): void {
        if (dragged) {
            dragged = false;
            event.preventDefault();
            return;
        }
        if (event.target instanceof Element && event.target.closest('a')) return;
        const box = surface.getBoundingClientRect();
        const from = position.target;
        glide(
            nearestCell({
                col: from.col + (event.clientX - box.left - width / 2) / step.x,
                row: from.row + (event.clientY - box.top - height / 2) / step.y
            })
        );
    }

    $effect(() => () => clearTimeout(settleTimer));
</script>

<!--
@component
An endless wall of titles seen through a camera viewfinder. The viewfinder stays in the
centre and the wall moves under it: the wheel, a drag or the arrows pan it, and it then
settles so one title sits exactly in the frame. A drag let go while moving carries the wall
on a little, one tile at most. A tile grows as it nears the centre and
shrinks as it leaves, so the framed title is always the biggest. The wall never ends because only the cells
on screen are drawn, and each cell picks its title from the catalogue by its coordinates.

The viewfinder is the one link of the wall, so a remote reaches it in one step. It names the
framed title and OK opens it. While it holds focus the arrows pan the wall, until Back
returns to normal mode. It has no outline: its brackets grow and thicken to 4px while it
holds focus, and that is its focus ring. The tiles are decoration: a click on one brings it
into the frame.
-->

<div
    bind:this={surface}
    bind:clientWidth={width}
    bind:clientHeight={height}
    class="absolute inset-0 cursor-grab touch-none overflow-hidden overscroll-contain select-none
        active:cursor-grabbing"
    role="presentation"
    {onwheel}
    {onkeydown}
    {onpointerdown}
    {onpointermove}
    {onpointerup}
    onpointercancel={onpointerup}
    {onclick}
    ondragstart={(event) => event.preventDefault()}
>
    <div
        class="absolute top-1/2 left-1/2 will-change-transform"
        style="transform: translate3d({-position.current.col * step.x}px, {-position.current.row * step.y}px, 0)"
        aria-hidden="true"
    >
        {#each cells as cell (`${cell.col}:${cell.row}`)}
            {@const tileItem = itemAt(items, cell)}
            {@const inFrame = cell.col === framed.col && cell.row === framed.row}
            <div
                class="absolute -translate-x-1/2 -translate-y-1/2 bg-fc-page transition-opacity duration-300
                    motion-reduce:transition-none
                    {inFrame ? 'z-10 opacity-100' : 'opacity-70'}"
                style="left: {cell.col * step.x}px; top: {cell.row * step.y}px; width: {tile.width}px; height: {tile.height}px; scale: {scaleOf(cell)}"
            >
                <Artwork title={tileItem.title} kind={tileItem.kind} image={tileItem.image} class="size-full" />
            </div>
        {/each}
    </div>

    <div
        class="pointer-events-none absolute inset-0 bg-radial from-transparent from-35% to-fc-page/50"
        aria-hidden="true"
    ></div>

    <a
        href="/title/{item.id}"
        draggable="false"
        class="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white
            outline-none"
        style="width: {tile.width * FRAMED_SCALE + FRAME_MARGIN * 2}px; height: {tile.height * FRAMED_SCALE +
            FRAME_MARGIN * 2}px"
        aria-label="{item.title}, {item.year}"
    >
        <span aria-hidden="true">
            {#each brackets as bracket (bracket)}
                <span class="absolute size-6 border-fc-fg group-focus-visible:size-8 {bracket}"></span>
            {/each}
            <span class="absolute top-1/2 left-1/2 h-px w-3 -translate-x-1/2 bg-white/80"></span>
            <span class="absolute top-1/2 left-1/2 h-3 w-px -translate-y-1/2 bg-white/80"></span>
            <span class="absolute inset-x-3 top-3 flex justify-between p-3 text-xs">
                <span>{KIND_LABELS[item.kind]}</span>
                <span class="tabular-nums">{item.year}</span>
            </span>
            <span class="absolute inset-x-1 bottom-1 flex flex-col gap-1 p-3">
                <span class="line-clamp-2 text-sm">{item.title}</span>
                <span class="text-xs tabular-nums text-white/80">{runtime}</span>
            </span>
        </span>
    </a>

    <p class="sr-only" aria-live="polite">{item.title}, {item.year}</p>
</div>
