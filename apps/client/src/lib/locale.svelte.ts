import { isLocale, type Locale } from '@facile/muse';

const KEY = 'bobine-locale';

/** The language the user picked, or null while the device's own language is followed. */
export const language = $state<{ locale: Locale | null }>({ locale: null });

/** Reads the saved language, if one was saved. */
export function loadLocale(): void {
    try {
        const raw = localStorage.getItem(KEY);
        language.locale = isLocale(raw) ? raw : null;
    } catch {
        language.locale = null;
    }
}

/** Uses and remembers a language. */
export function saveLocale(locale: Locale): void {
    language.locale = locale;
    try {
        localStorage.setItem(KEY, locale);
    } catch {
        return;
    }
}
