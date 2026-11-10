import { icons, registerIcons } from '@facile/muse';

/** Bobine's mark: a film reel. */
export const BOBINE_ICON = 'solar:reel-bold-duotone';

const MOVIES_ICON = 'solar:clapperboard-play-linear';
const SHOWS_ICON = 'solar:tv-linear';

export const appIcons = {
	home: icons.home,
	movies: MOVIES_ICON,
	shows: SHOWS_ICON
};

/**
 * Registers the glyphs muse lacks, bundled so no icon is fetched at runtime. The artwork is
 * Solar by 480 Design, CC BY 4.0.
 */
export function registerAppIcons() {
	registerIcons({
		[BOBINE_ICON]: {
			width: 24,
			height: 24,
			body: "<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M2 12C2 17.5228 6.47715 22 12 22H21.25C21.6642 22 22 21.6642 22 21.25C22 20.8358 21.6642 20.5 21.25 20.5H17.2704C20.1097 18.7358 22 15.5887 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z\" clip-rule=\"evenodd\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M16.5 10.5C17.3284 10.5 18 11.1716 18 12C18 12.8284 17.3284 13.5 16.5 13.5C15.6716 13.5 15 12.8284 15 12C15 11.1716 15.6716 10.5 16.5 10.5Z\"/><path fill=\"currentColor\" d=\"M9 12C9 11.1716 8.32843 10.5 7.5 10.5C6.67157 10.5 6 11.1716 6 12C6 12.8284 6.67157 13.5 7.5 13.5C8.32843 13.5 9 12.8284 9 12Z\"/><path fill=\"currentColor\" d=\"M13.5 7.5C13.5 8.32843 12.8284 9 12 9C11.1716 9 10.5 8.32843 10.5 7.5C10.5 6.67157 11.1716 6 12 6C12.8284 6 13.5 6.67157 13.5 7.5Z\"/><path fill=\"currentColor\" d=\"M13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5Z\"/>"
		},
		[MOVIES_ICON]: {
			width: 24,
			height: 24,
			body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\"><path d=\"M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z\"/><path d=\"M21.5 8H2.5\"/><path d=\"M7 8L10.5 2.5\"/><path d=\"M13.5 8L17 2.5\"/><path d=\"M13.014 12.5852C14.338 13.4395 15 13.8666 15 14.5C15 15.1334 14.338 15.5605 13.014 16.4148C11.6719 17.2807 11.0008 17.7137 10.5004 17.3958C10 17.0779 10 16.2186 10 14.5C10 12.7814 10 11.9221 10.5004 11.6042C11.0008 11.2863 11.6719 11.7193 13.014 12.5852Z\"/></g>"
		},
		[SHOWS_ICON]: {
			width: 24,
			height: 24,
			body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\"><path d=\"M16 6L8 6C5.17157 6 3.75736 6 2.87868 6.87868C2 7.75736 2 9.17157 2 12L2 16C2 18.8284 2 20.2426 2.87868 21.1213C3.75736 22 5.17157 22 8 22L16 22C18.8284 22 20.2426 22 21.1213 21.1213C22 20.2426 22 18.8284 22 16V12C22 9.17157 22 7.75736 21.1213 6.87868C20.2426 6 18.8284 6 16 6Z\"/><path d=\"M9 2L12 5.5L15 2\"/><path d=\"M16 6V22\"/><path stroke-linejoin=\"round\" d=\"M19 12H19.0001\"/><path stroke-linejoin=\"round\" d=\"M19 16H19.0001\"/></g>"
		}
	});
}
