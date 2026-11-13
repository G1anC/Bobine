/** The zone that holds keyboard or remote focus, by its `data-zone` name, or null in normal mode. */
export const focused = $state<{ zone: string | null }>({ zone: null });

/**
 * Keeps `focused.zone` up to date from the focus events of the document. Only focus brought
 * by a keyboard or a remote counts, so a mouse click on a button does not put the app in a
 * zone.
 */
export function watchZone(): () => void {
    const onFocusIn = (event: FocusEvent) => {
        const target = event.target;
        const driven = target instanceof HTMLElement && target.matches(':focus-visible');
        focused.zone = driven ? (target.closest<HTMLElement>('[data-zone]')?.dataset.zone ?? null) : null;
    };
    const onFocusOut = (event: FocusEvent) => {
        if (!event.relatedTarget) focused.zone = null;
    };
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
        document.removeEventListener('focusin', onFocusIn);
        document.removeEventListener('focusout', onFocusOut);
    };
}
