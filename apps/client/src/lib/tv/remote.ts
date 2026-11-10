import { App } from '@capacitor/app';
import { directionOf, nearest, type Box } from './spatial';
import { isNative } from '$lib/platform';

const FOCUSABLE =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const TEXT_INPUT = 'input:not([type=checkbox]):not([type=radio]):not([type=range]), textarea, select';
const BACK_KEYS = new Set(['Escape', 'GoBack', 'BrowserBack', 'Backspace']);

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

function moveFocus(event: KeyboardEvent): void {
	const direction = directionOf(event.key);
	if (!direction) return;
	const current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
	const horizontalInText = editingText(current) && (direction === 'left' || direction === 'right');
	if (horizontalInText) return;
	const reachable = candidates();
	if (!current || current === document.body || !reachable.includes(current)) {
		reachable[0]?.focus();
		event.preventDefault();
		return;
	}
	const others = reachable.filter((element) => element !== current);
	const boxes: Box[] = others.map((element) => element.getBoundingClientRect());
	const index = nearest(current.getBoundingClientRect(), boxes, direction);
	if (index < 0) return;
	event.preventDefault();
	others[index].focus();
	others[index].scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

function goBack(event: KeyboardEvent): void {
	if (!BACK_KEYS.has(event.key) || editingText(event.target)) return;
	if (document.querySelector('dialog[open]')) return;
	event.preventDefault();
	history.back();
}

/**
 * Makes the app drivable with a TV remote, a keyboard or a gamepad mapped to arrows: the
 * arrows move focus to the nearest element on screen, OK/Enter activates it as a click, and
 * Back returns to the previous page. On Android TV the hardware Back button goes through
 * Capacitor, which otherwise closes the app from any page.
 */
export function registerRemote(): () => void {
	const onKey = (event: KeyboardEvent) => {
		if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
		moveFocus(event);
		goBack(event);
	};
	window.addEventListener('keydown', onKey);
	const back = isNative()
		? App.addListener('backButton', ({ canGoBack }) => (canGoBack ? history.back() : App.exitApp()))
		: null;
	return () => {
		window.removeEventListener('keydown', onKey);
		void back?.then((handle) => handle.remove());
	};
}
