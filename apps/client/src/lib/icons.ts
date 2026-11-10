import { registerIcons } from '@facile/muse';
import type { MediaKind } from '$lib/library';

/** Bobine's mark: a film camera with its two reels. */
export const BOBINE_ICON = 'iconoir:cinema-old';

const HOME_ICON = 'iconoir:home-simple';
const MOVIES_ICON = 'iconoir:movie';
const SHOWS_ICON = 'iconoir:modern-tv';

export const appIcons = {
	home: HOME_ICON,
	movies: MOVIES_ICON,
	shows: SHOWS_ICON
};

/** The icon that stands for each kind of media, on placeholders and empty states. */
export const kindIcons: Record<MediaKind, string> = {
	movie: MOVIES_ICON,
	show: SHOWS_ICON
};

/**
 * Registers the app's own glyphs, bundled so no icon is fetched at runtime. The artwork is
 * Iconoir by Luca Burgio, MIT, drawn at stroke 2.
 */
export function registerAppIcons() {
	registerIcons({
		[BOBINE_ICON]: {
			width: 24,
			height: 24,
			body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M7 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m10 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-5-5a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4\"/><path d=\"M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2S2 6.477 2 12m0 0v10\"/></g>"
		},
		[HOME_ICON]: {
			width: 24,
			height: 24,
			body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17 21H7a4 4 0 0 1-4-4v-6.292a4 4 0 0 1 1.927-3.421l5-3.03a4 4 0 0 1 4.146 0l5 3.03A4 4 0 0 1 21 10.707V17a4 4 0 0 1-4 4m-8-4h6\"/>"
		},
		[MOVIES_ICON]: {
			width: 24,
			height: 24,
			body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m7 8.01l.01-.011M17 8.01l.01-.011M7 12.01l.01-.011m9.99.011l.01-.011M7 16.01l.01-.011m9.99.011l.01-.011M7 2H3.6a.6.6 0 0 0-.6.6v18.8a.6.6 0 0 0 .6.6H7M7 2v2m0-2h10m0 0h3.4a.6.6 0 0 1 .6.6v18.8a.6.6 0 0 1-.6.6H17m0-20v2m0 18v-2m0 2H7m0 0v-2\"/>"
		},
		[SHOWS_ICON]: {
			width: 24,
			height: 24,
			body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7 21h10\"/><path d=\"M2 16.4V3.6a.6.6 0 0 1 .6-.6h18.8a.6.6 0 0 1 .6.6v12.8a.6.6 0 0 1-.6.6H2.6a.6.6 0 0 1-.6-.6Z\"/></g>"
		}
	});
}
