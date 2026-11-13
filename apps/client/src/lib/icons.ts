import { registerIcons } from '@facile/muse';
import type { MediaKind } from '$lib/library';

/** Bobine's mark: a strip of film curling off its reel. */
export const BOBINE_ICON = 'bobine:logo';

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
const LIGHT_ICON = 'iconoir:sun-light';
const DARK_ICON = 'iconoir:half-moon';
const SIGN_IN_ICON = 'iconoir:log-in';
const SIGN_OUT_ICON = 'iconoir:log-out';
const DATE_ICON = 'iconoir:calendar';

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
	retry: RETRY_ICON,
	light: LIGHT_ICON,
	dark: DARK_ICON,
	signIn: SIGN_IN_ICON,
	signOut: SIGN_OUT_ICON,
	date: DATE_ICON
};

/** The icon that stands for each kind of media, on placeholders and empty states. */
export const kindIcons: Record<MediaKind, string> = {
	movie: MOVIES_ICON,
	show: SHOWS_ICON,
	album: MUSIC_ICON,
	podcast: PODCASTS_ICON
};

/**
 * Registers the app's own glyphs, bundled so no icon is fetched at runtime. Bobine's mark is
 * drawn by the team; the other artwork is Iconoir by Luca Burgio, MIT, drawn at stroke 2.
 */
export function registerAppIcons() {
	registerIcons({
		[BOBINE_ICON]: {
			width: 32,
			height: 32,
			body: '<path fill="currentColor" d="M4 4.7928L3.76607 3.87205C3.34488 3.97906 3.05 4.35822 3.05 4.7928H4ZM18.1541 27.7831H17.2041C17.2041 28.2498 17.5431 28.6473 18.0039 28.7211L18.1541 27.7831ZM18.1541 21.3144L18.2497 20.3692C17.9825 20.3422 17.7163 20.4296 17.5171 20.6097C17.3178 20.7898 17.2041 21.0458 17.2041 21.3144H18.1541ZM6.47993 17.4153L6.45466 18.365C6.47307 18.3654 6.49148 18.3654 6.50988 18.3648L6.47993 17.4153ZM10.3833 7.74866L11.1004 7.12548L11.1003 7.12543L10.3833 7.74866ZM15.7653 9.1041L15.1445 8.38495V8.38495L15.7653 9.1041ZM12.2021 17.3141C12.1672 17.8376 12.5633 18.2902 13.0868 18.3251C13.6103 18.36 14.063 17.9639 14.0979 17.4404L13.15 17.3772L12.2021 17.3141ZM14.3979 12.9404C14.4328 12.4169 14.0367 11.9643 13.5132 11.9294C12.9897 11.8945 12.537 12.2905 12.5021 12.8141L13.45 12.8772L14.3979 12.9404ZM19.7027 15.0558C19.6632 15.5789 20.0553 16.0351 20.5785 16.0746C21.1017 16.114 21.5578 15.7219 21.5973 15.1987L20.65 15.1272L19.7027 15.0558ZM22.1973 7.24874C22.2368 6.72556 21.8447 6.26943 21.3215 6.22994C20.7983 6.19045 20.3422 6.58257 20.3027 7.10575L21.25 7.17725L22.1973 7.24874ZM28 23.0478H28.95V14.9537H28H27.05V23.0478H28ZM4 4.7928L4.23393 5.71354C10.5214 4.11612 16.2846 5.20072 20.4595 7.34624C22.549 8.42004 24.2187 9.74832 25.3551 11.113C26.501 12.4892 27.05 13.8326 27.05 14.9537H28H28.95C28.95 13.2367 28.1302 11.4765 26.8152 9.89721C25.4906 8.30651 23.6072 6.82766 21.328 5.65634C16.7654 3.31162 10.5286 2.15395 3.76607 3.87205L4 4.7928ZM28 23.0478H27.05C27.05 23.2033 26.9185 23.5794 26.3599 24.1255C25.8369 24.6369 25.0686 25.1678 24.1493 25.6314C22.2875 26.5703 20.0348 27.1221 18.3043 26.845L18.1541 27.7831L18.0039 28.7211C20.2734 29.0845 22.9437 28.3673 25.0048 27.3279C26.047 26.8023 26.9901 26.1666 27.6882 25.4841C28.3508 24.8363 28.95 23.9911 28.95 23.0478H28ZM18.1541 27.7831H19.1041V21.3144H18.1541H17.2041V27.7831H18.1541ZM18.1541 21.3144L18.0585 22.2596C18.6718 22.3217 19.8762 22.2628 21.1835 22.0179C22.4962 21.7721 24.0396 21.3161 25.2748 20.5065L24.7541 19.7119L24.2333 18.9174C23.2972 19.5309 22.0324 19.9259 20.8338 20.1504C19.6299 20.3759 18.62 20.4067 18.2497 20.3692L18.1541 21.3144ZM4 4.7928H3.05V15.2772H4H4.95V4.7928H4ZM4 15.2772H3.05C3.05 16.2745 3.41395 17.0963 4.12149 17.6452C4.78539 18.1601 5.63517 18.3432 6.45466 18.365L6.47993 17.4153L6.50519 16.4656C5.89476 16.4494 5.50458 16.3134 5.286 16.1438C5.11105 16.0082 4.95 15.78 4.95 15.2772H4ZM6.47993 17.4153L6.50988 18.3648C10.5784 18.2365 15.752 18.3779 19.9458 19.1662C22.0493 19.5615 23.8381 20.1076 25.1082 20.8201C26.3843 21.536 26.971 22.3184 27.0549 23.1439L28 23.0478L28.9451 22.9518C28.7712 21.2412 27.5638 20.0191 26.0378 19.163C24.5056 18.3035 22.484 17.7099 20.2968 17.2989C15.9093 16.4742 10.5806 16.3355 6.44998 16.4658L6.47993 17.4153ZM10.3833 7.74866L9.66628 8.37184C9.96269 8.7129 10.4445 9.02788 10.9166 9.28215C11.4172 9.55177 12.0148 9.80993 12.6272 10.0068C13.2338 10.2017 13.8955 10.3496 14.5151 10.3704C15.1054 10.3902 15.8335 10.3001 16.386 9.82325L15.7653 9.1041L15.1445 8.38495C15.1303 8.39718 14.9919 8.48531 14.5788 8.47146C14.1949 8.45859 13.7163 8.36104 13.2086 8.19788C12.7067 8.03658 12.2161 7.82397 11.8175 7.60933C11.3905 7.37932 11.1621 7.19653 11.1004 7.12548L10.3833 7.74866ZM15.7653 9.1041L16.386 9.82325C16.726 9.52976 17.1198 9.01831 16.9744 8.34458C16.8482 7.75997 16.3791 7.42912 16.0873 7.26368C15.4501 6.90238 14.4992 6.68849 13.6467 6.56678C12.7635 6.44069 11.8252 6.39222 11.1278 6.43583C10.8066 6.45591 10.4244 6.50067 10.1222 6.62605C10.0009 6.67635 9.65811 6.83074 9.48236 7.21532C9.24629 7.73189 9.49424 8.17392 9.66632 8.37189L10.3833 7.74866L11.1003 7.12543C11.1828 7.22037 11.4092 7.57014 11.2105 8.00505C11.1351 8.16989 11.0281 8.26587 10.9691 8.31051C10.9088 8.35611 10.8618 8.37623 10.8502 8.38104C10.8401 8.38525 10.9493 8.3507 11.2464 8.33212C11.7854 8.29842 12.5907 8.33528 13.3781 8.44771C14.1963 8.56452 14.843 8.74235 15.1502 8.91649C15.3305 9.01877 15.1703 8.99156 15.1171 8.74536C15.0448 8.41003 15.2757 8.27172 15.1445 8.38495L15.7653 9.1041ZM13.15 17.3772L14.0979 17.4404L14.3979 12.9404L13.45 12.8772L12.5021 12.8141L12.2021 17.3141L13.15 17.3772ZM20.65 15.1272L21.5973 15.1987L22.1973 7.24874L21.25 7.17725L20.3027 7.10575L19.7027 15.0558L20.65 15.1272Z"/>'
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
		[DATE_ICON]: {
			width: 24,
			height: 24,
			body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9zm0 0V6a2 2 0 0 1 2-2h2m0-2v4m14 4V6a2 2 0 0 0-2-2h-.5\"/>"
		},
		[LIGHT_ICON]: {
			width: 24,
			height: 24,
			body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12m10-6h1M12 2V1m0 22v-1m8-2l-1-1m1-15l-1 1M4 20l1-1M4 4l1 1m-4 7h1\"/>"
		},
		[DARK_ICON]: {
			width: 24,
			height: 24,
			body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 11.507a9.493 9.493 0 0 0 18 4.219c-8.507 0-12.726-4.22-12.726-12.726A9.49 9.49 0 0 0 3 11.507\"/>"
		},
		[SIGN_IN_ICON]: {
			width: 24,
			height: 24,
			body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 12h-7m0 0l3 3m-3-3l3-3m4-3V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1\"/>"
		},
		[SIGN_OUT_ICON]: {
			width: 24,
			height: 24,
			body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 12h7m0 0l-3 3m3-3l-3-3m3-3V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1\"/>"
		},
		[RETRY_ICON]: {
			width: 24,
			height: 24,
			body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M21.168 8A10 10 0 0 0 12 2c-5.185 0-9.45 3.947-9.95 9\"/><path d=\"M17 8h4.4a.6.6 0 0 0 .6-.6V3M2.881 16c1.544 3.532 5.068 6 9.168 6c5.186 0 9.45-3.947 9.951-9\"/><path d=\"M7.05 16h-4.4a.6.6 0 0 0-.6.6V21\"/></g>"
		}
	});
}
