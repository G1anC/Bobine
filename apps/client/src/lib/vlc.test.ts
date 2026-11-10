import { beforeEach, describe, expect, it, vi } from 'vitest';

const invoke = vi.fn();
const isDesktop = vi.fn();

vi.mock('@tauri-apps/api/core', () => ({ invoke }));
vi.mock('$lib/platform', () => ({ isApp: () => true, isDesktop }));

const { isStreamUrl, openInVlc, vlcLink } = await import('./vlc');

describe('vlc', () => {
    beforeEach(() => {
        invoke.mockReset();
        isDesktop.mockReset();
    });

    it('accepts web streams only', () => {
        expect(isStreamUrl('https://archive.org/download/Sintel/sintel.mp4')).toBe(true);
        expect(isStreamUrl('--fullscreen')).toBe(false);
        expect(isStreamUrl('file:///etc/passwd')).toBe(false);
        expect(isStreamUrl('https://archive.org/a b.mp4')).toBe(false);
    });

    it('puts the stream behind the vlc scheme', () => {
        expect(vlcLink('https://archive.org/a.mp4')).toBe('vlc://https://archive.org/a.mp4');
    });

    it('asks the desktop shell to start VLC', async () => {
        isDesktop.mockReturnValue(true);
        await openInVlc('https://archive.org/a.mp4');
        expect(invoke).toHaveBeenCalledWith('open_in_vlc', { url: 'https://archive.org/a.mp4' });
    });

    it('reports a desktop without VLC', async () => {
        isDesktop.mockReturnValue(true);
        invoke.mockRejectedValue('VLC did not start');
        await expect(openInVlc('https://archive.org/a.mp4')).rejects.toBe('VLC did not start');
    });

    it('refuses anything that is not a web stream', async () => {
        isDesktop.mockReturnValue(true);
        await expect(openInVlc('--play-and-exit')).rejects.toThrow();
        expect(invoke).not.toHaveBeenCalled();
    });
});
