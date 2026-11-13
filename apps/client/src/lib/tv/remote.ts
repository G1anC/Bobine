import { App } from '@capacitor/app';
import { directionOf, nearest, type Box } from './spatial';
import { isNative } from '$lib/platform';

const FOCUSABLE =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const TEXT_INPUT = 'input:not([type=checkbox]):not([type=radio]):not([type=range]), textarea, select';
const BACK_KEYS = new Set(['Escape', 'GoBack', 'BrowserBack', 'Backspace']);
const ZONE = '[data-zone]';
const ABOVE: Record<string, string> = { up: 'top' };
const ZONE_KEYS: Record<string, string[]> = {
	ArrowLeft: ['left'],
	ArrowUp: ['up', 'top', 'main'],
	ArrowRight: ['main'],
	ArrowDown: ['main'],
	Enter: ['main']
};

function visible(element: HTMLElement): boolean {
	const box = element.getBoundingClientRect();
	return box.width > 0 && box.height > 0 && getComputedStyle(element).visibility !== 'hidden';
}

/** The focusable elements a remote can reach: inside an open modal dialog when there is one. */
function candidates(): HTMLElement[] {
	const scope = document.querySelector<HTMLElement>('dialog[open]') ?? document.body;
	return Array.from(scope.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(visible);
}

function editingText(target: EventTarget | null): boolean {
	return target instanceof HTMLElement && (target.matches(TEXT_INPUT) || target.isContentEditable);
}

/** The zone an element belongs to: its closest ancestor marked `data-zone`, or null. */
function zoneOf(element: Element | null): HTMLElement | null {
	return element?.closest<HTMLElement>(ZONE) ?? null;
}

/** The focusable elements of one zone, without those of a zone nested inside it. */
function members(zone: HTMLElement): HTMLElement[] {
	return candidates().filter((element) => zoneOf(element) === zone);
}

/**
 * From normal mode, where nothing holds focus, a key enters a zone: Left the `left` one, Up
 * the `up` one or else the `top` one, and Right, Down or OK the `main` one. Focus lands on
 * the current page link when the zone has one, on its first element otherwise.
 */
function enterZone(event: KeyboardEvent, names = ZONE_KEYS[event.key] ?? []): void {
	for (const name of names) {
		for (const zone of document.querySelectorAll<HTMLElement>(`[data-zone="${name}"]`)) {
			const inside = members(zone);
			const target = inside.find((element) => element.getAttribute('aria-current') === 'page') ?? inside[0];
			if (!target) continue;
			event.preventDefault();
			target.focus();
			return;
		}
	}
}

/** Back to normal mode: drops focus when a zone holds it. True when it did. */
function leaveZone(): boolean {
	const current = document.activeElement;
	if (!(current instanceof HTMLElement) || !zoneOf(current)) return false;
	current.blur();
	return true;
}

function moveFocus(event: KeyboardEvent, reachable: HTMLElement[]): boolean {
	const direction = directionOf(event.key);
	if (!direction) return false;
	const current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
	const horizontalInText = editingText(current) && (direction === 'left' || direction === 'right');
	if (horizontalInText) return true;
	if (!current || current === document.body || !reachable.includes(current)) {
		reachable[0]?.focus();
		event.preventDefault();
		return true;
	}
	const others = reachable.filter((element) => element !== current);
	const boxes: Box[] = others.map((element) => element.getBoundingClientRect());
	const index = nearest(current.getBoundingClientRect(), boxes, direction);
	if (index < 0) return false;
	event.preventDefault();
	others[index].focus();
	others[index].scrollIntoView({ block: 'nearest', inline: 'nearest' });
	return true;
}

/**
 * Routes a key. A page without zones, or an open dialog, keeps plain spatial navigation over
 * everything on screen. Otherwise the arrows stay inside the zone that holds focus, and in
 * normal mode they pick a zone to enter. Up from the top edge of the filters climbs to the bar.
 */
function navigate(event: KeyboardEvent): void {
	if (document.querySelector('dialog[open]') || !document.querySelector(ZONE)) {
		moveFocus(event, candidates());
		return;
	}
	const zone = zoneOf(document.activeElement);
	if (!zone) {
		enterZone(event);
		return;
	}
	const above = ABOVE[zone.dataset.zone ?? ''];
	if (!moveFocus(event, members(zone)) && event.key === 'ArrowUp' && above) enterZone(event, [above]);
}

function goBack(event: KeyboardEvent): void {
	if (!BACK_KEYS.has(event.key) || editingText(event.target)) return;
	if (document.querySelector('dialog[open]')) return;
	event.preventDefault();
	if (!leaveZone()) history.back();
}

/**
 * Makes the app drivable with a TV remote, a keyboard or a gamepad mapped to arrows. The
 * screen is cut into zones, elements marked `data-zone`: the top bar (`top`), the menu
 * (`left`), the filters (`up`) and the page (`main`). In normal mode nothing holds focus and one key enters a
 * zone. Inside a zone the arrows move focus to the nearest element of that zone and OK
 * activates it. Back, or Escape, returns to normal mode, and from normal mode to the previous
 * page. On Android TV the hardware Back button goes through Capacitor, which otherwise
 * closes the app from any page.
 */
export function registerRemote(): () => void {
	const onKey = (event: KeyboardEvent) => {
		if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
		navigate(event);
		goBack(event);
	};
	window.addEventListener('keydown', onKey);
	const back = isNative()
		? App.addListener('backButton', ({ canGoBack }) => {
				if (leaveZone()) return;
				if (canGoBack) history.back();
				else void App.exitApp();
			})
		: null;
	return () => {
		window.removeEventListener('keydown', onKey);
		void back?.then((handle) => handle.remove());
	};
}
