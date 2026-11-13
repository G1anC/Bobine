import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadSession, session } from './session.svelte';

const { ApiError, me } = vi.hoisted(() => {
    class ApiError extends Error {
        status: number;

        constructor(message: string, status: number) {
            super(message);
            this.status = status;
        }
    }
    return { ApiError, me: vi.fn() };
});

vi.mock('$lib/backend', () => ({ ApiError, backend: { me } }));

const user = { id: '1', email: 'ada@example.org', name: 'Ada' };

describe('loadSession', () => {
    beforeEach(() => {
        me.mockReset();
    });

    it('signs the caller in when the server knows them', async () => {
        me.mockResolvedValue(user);
        await loadSession();
        expect(session).toEqual({ status: 'ready', user });
    });

    it('treats a 401 as signed out, not as an outage', async () => {
        me.mockRejectedValue(new ApiError('Unauthorized', 401));
        await loadSession();
        expect(session).toEqual({ status: 'ready', user: null });
    });

    it('goes offline when the server cannot be reached, and recovers on a retry', async () => {
        me.mockRejectedValue(new TypeError('Failed to fetch'));
        await loadSession();
        expect(session.status).toBe('offline');

        me.mockResolvedValue(user);
        const retry = loadSession();
        expect(session.status).toBe('loading');
        await retry;
        expect(session).toEqual({ status: 'ready', user });
    });
});
