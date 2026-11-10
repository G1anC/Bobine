import { registerIcons } from '@facile/muse';
import type { MediaKind } from '$lib/library';

/** Bobine's mark: a film camera with its two reels. */
export const BOBINE_ICON = 'iconoir:cinema-old';

const HOME_ICON = 'iconoir:home-simple';
const MOVIES_ICON = 'iconoir:movie';
const SHOWS_ICON = 'iconoir:modern-tv';
const PLAY_ICON = 'iconoir:play';
const PAUSE_ICON = 'iconoir:pause';
const BACK_ICON = 'iconoir:backward-15-seconds';
const FORWARD_ICON = 'iconoir:forward-15-seconds';
const SOUND_ICON = 'iconoir:sound-high';
const MUTED_ICON = 'iconoir:sound-off';
const EXPAND_ICON = 'iconoir:expand';
const EXTERNAL_ICON = 'iconoir:open-new-window';
const PREVIOUS_ICON = 'iconoir:skip-prev';
const NEXT_ICON = 'iconoir:skip-next';
const MUSIC_ICON = 'iconoir:music-double-note';
const PODCASTS_ICON = 'iconoir:microphone';
const RETRY_ICON = 'iconoir:refresh-double';

export const appIcons = {
	home: HOME_ICON,
	movies: MOVIES_ICON,
	shows: SHOWS_ICON,
	play: PLAY_ICON,
	pause: PAUSE_ICON,
	back: BACK_ICON,
	forward: FORWARD_ICON,
	sound: SOUND_ICON,
	muted: MUTED_ICON,
	expand: EXPAND_ICON,
	external: EXTERNAL_ICON,
	previous: PREVIOUS_ICON,
	next: NEXT_ICON,
	music: MUSIC_ICON,
	podcasts: PODCASTS_ICON,
	retry: RETRY_ICON
};

/** The icon that stands for each kind of media, on placeholders and empty states. */
export const kindIcons: Record<MediaKind, string> = {
	movie: MOVIES_ICON,
	show: SHOWS_ICON,
	album: MUSIC_ICON,
	podcast: PODCASTS_ICON
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
		},
		[PLAY_ICON]: {
			width: 24,
			height: 24,
			body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6.906 4.537A.6.6 0 0 0 6 5.053v13.894a.6.6 0 0 0 .906.516l11.723-6.947a.6.6 0 0 0 0-1.032z\"/>"
		},
		[PAUSE_ICON]: {
			width: 24,
			height: 24,
			body: "<path fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" d=\"M6 18.4V5.6a.6.6 0 0 1 .6-.6h2.8a.6.6 0 0 1 .6.6v12.8a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6Zm8 0V5.6a.6.6 0 0 1 .6-.6h2.8a.6.6 0 0 1 .6.6v12.8a.6.6 0 0 1-.6.6h-2.8a.6.6 0 0 1-.6-.6Z\"/>"
		},
		[BACK_ICON]: {
			width: 24,
			height: 24,
			body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M3 13a9 9 0 1 0 9-9M9 9v7\"/><path d=\"M15 9h-2a1 1 0 0 0-1 1v1.5a1 1 0 0 0 1 1h1a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1h-2m0-12H4.5m0 0l2-2m-2 2l2 2\"/></g>"
		},
		[FORWARD_ICON]: {
			width: 24,
			height: 24,
			body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M21 13a9 9 0 1 1-9-9m0 0h7.5m0 0l-2-2m2 2l-2 2M9 9v7\"/><path d=\"M15 9h-2a1 1 0 0 0-1 1v1.5a1 1 0 0 0 1 1h1a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1h-2\"/></g>"
		},
		[SOUND_ICON]: {
			width: 24,
			height: 24,
			body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M1 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H3a2 2 0 0 1-2-2Z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M17.5 7.5S19 9 19 11.5s-1.5 4-1.5 4m3-11S23 7 23 11.5s-2.5 7-2.5 7\"/></g>"
		},
		[MUTED_ICON]: {
			width: 24,
			height: 24,
			body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m18 14l2-2m2-2l-2 2m0 0l-2-2m2 2l2 2\"/><path d=\"M2 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H4a2 2 0 0 1-2-2Z\"/></g>"
		},
		[EXPAND_ICON]: {
			width: 24,
			height: 24,
			body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 9L4 4m0 0v4m0-4h4m7 5l5-5m0 0v4m0-4h-4M9 15l-5 5m0 0v-4m0 4h4m7-5l5 5m0 0v-4m0 4h-4\"/>"
		},
		[EXTERNAL_ICON]: {
			width: 24,
			height: 24,
			body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"2\"><path stroke-linejoin=\"round\" d=\"M21 3h-6m6 0l-9 9m9-9v6\"/><path d=\"M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6\"/></g>"
		},
		[PREVIOUS_ICON]: {
			width: 24,
			height: 24,
			body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 7v10M17.028 5.267a.6.6 0 0 1 .972.471v12.524a.6.6 0 0 1-.972.47l-7.931-6.261a.6.6 0 0 1 0-.942z\"/>"
		},
		[NEXT_ICON]: {
			width: 24,
			height: 24,
			body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M18 7v10M6.972 5.267A.6.6 0 0 0 6 5.738v12.524a.6.6 0 0 0 .972.47l7.931-6.261a.6.6 0 0 0 0-.942z\"/>"
		},
		[MUSIC_ICON]: {
			width: 24,
			height: 24,
			body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M20 14V3L9 5v11\"/><path d=\"M17 19h1a2 2 0 0 0 2-2v-3h-3a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2M6 21h1a2 2 0 0 0 2-2v-3H6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2\"/></g>"
		},
		[PODCASTS_ICON]: {
			width: 24,
			height: 24,
			body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect width=\"6\" height=\"12\" x=\"9\" y=\"2\" rx=\"3\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5 10v1a7 7 0 1 0 14 0v-1m-7 8v4m0 0H9m3 0h3\"/></g>"
		},
		[RETRY_ICON]: {
			width: 24,
			height: 24,
			body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M21.168 8A10 10 0 0 0 12 2c-5.185 0-9.45 3.947-9.95 9\"/><path d=\"M17 8h4.4a.6.6 0 0 0 .6-.6V3M2.881 16c1.544 3.532 5.068 6 9.168 6c5.186 0 9.45-3.947 9.951-9\"/><path d=\"M7.05 16h-4.4a.6.6 0 0 0-.6.6V21\"/></g>"
		}
	});
}
