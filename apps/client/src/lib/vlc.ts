import { invoke } from '@tauri-apps/api/core';
import { isApp, isDesktop } from '$lib/platform';

/** True where Bobine can pass a stream to the VLC installed on the device: the packaged apps. */
export function canHandOff(): boolean {
    return isApp();
}

const KEY = 'bobine-vlc';

/** Whether the user wants video sent to VLC. It is on until they turn it off. */
export function handOffEnabled(): boolean {
    try {
        return localStorage.getItem(KEY) !== 'off';
    } catch {
        return true;
    }
}

/** Remembers whether video goes to VLC. */
export function setHandOff(enabled: boolean): void {
    try {
        localStorage.setItem(KEY, enabled ? 'on' : 'off');
    } catch {
        return;
    }
}

/** True for the only addresses Bobine sends to VLC: plain web streams. */
export function isStreamUrl(url: string): boolean {
    return /^https?:\/\/\S+$/.test(url);
}

/** The link VLC for Android registers for: the stream address behind the `vlc://` scheme. */
export function vlcLink(url: string): string {
    return `vlc://${url}`;
}

/**
 * Plays a stream in VLC. The desktop app starts the VLC program itself and reports when it
 * is missing. Android opens a `vlc://` link, which VLC answers when it is installed.
 */
export async function openInVlc(url: string): Promise<void> {
    if (!isStreamUrl(url)) throw new Error('Bobine only sends web streams to VLC.');
    if (isDesktop()) await invoke('open_in_vlc', { url });
    else window.location.href = vlcLink(url);
}
