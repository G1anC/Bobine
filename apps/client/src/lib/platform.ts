import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { isTauri } from '@tauri-apps/api/core';

const TOKEN_KEY = 'bobine.token';
const APP_API_BASE = 'https://bobine.facile.studio/api';

let cachedToken: string | null | undefined;

/** True inside the Capacitor shell: the phone, tablet and Android TV app. */
export function isNative(): boolean {
	return Capacitor.isNativePlatform();
}

/** True inside the Tauri desktop shell. */
export function isDesktop(): boolean {
	return isTauri();
}

/**
 * True in any packaged app. A packaged app is a different origin from the server, so it
 * calls the absolute API and carries a bearer token where the browser uses its cookie.
 */
export function isApp(): boolean {
	return isNative() || isDesktop();
}

/** The API root: relative in a browser, absolute in a packaged app, VITE_API_BASE wins. */
export function apiBase(): string {
	const override = import.meta.env.VITE_API_BASE as string | undefined;
	if (override) return override;
	return isApp() ? APP_API_BASE : '/api';
}

export async function getToken(): Promise<string | null> {
	if (!isApp()) return null;
	if (cachedToken === undefined) {
		cachedToken = (await Preferences.get({ key: TOKEN_KEY })).value;
	}
	return cachedToken;
}

export async function setToken(token: string): Promise<void> {
	if (!isApp()) return;
	cachedToken = token;
	await Preferences.set({ key: TOKEN_KEY, value: token });
}

export async function clearToken(): Promise<void> {
	if (!isApp()) return;
	cachedToken = null;
	await Preferences.remove({ key: TOKEN_KEY });
}
