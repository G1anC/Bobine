import { applyTheme, isTheme, type Theme } from '@facile/muse';

const KEY = 'bobine-theme';

/** The theme in use, shared by every screen that shows or changes it. */
export const appearance = $state<{ theme: Theme }>({ theme: 'system' });

function storedTheme(): Theme {
	try {
		const raw = localStorage.getItem(KEY);
		return isTheme(raw) ? raw : 'system';
	} catch {
		return 'system';
	}
}

/** Paints the saved theme, or `system` when none was saved. */
export function loadTheme(): void {
	appearance.theme = storedTheme();
	applyTheme(appearance.theme);
}

/** Paints and remembers a theme. */
export function saveTheme(theme: Theme): void {
	appearance.theme = theme;
	applyTheme(theme);
	try {
		localStorage.setItem(KEY, theme);
	} catch {
		return;
	}
}
