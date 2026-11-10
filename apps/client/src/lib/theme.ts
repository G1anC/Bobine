import { applyTheme, isTheme, type Theme } from '@facile/muse';

const KEY = 'bobine-theme';

/** The saved theme, or `system`. */
export function storedTheme(): Theme {
	try {
		const raw = localStorage.getItem(KEY);
		return isTheme(raw) ? raw : 'system';
	} catch {
		return 'system';
	}
}

/** Paints and remembers a theme. */
export function saveTheme(theme: Theme): void {
	applyTheme(theme);
	try {
		localStorage.setItem(KEY, theme);
	} catch {
		return;
	}
}
