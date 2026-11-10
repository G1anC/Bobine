import { ApiError, backend, type User } from '$lib/backend';

/**
 * Who is signed in. `status` stays `loading` until the first answer, so a guarded page can
 * wait instead of flashing the sign-in screen at someone who has a session.
 */
export const session = $state<{ status: 'loading' | 'ready' | 'offline'; user: User | null }>({
	status: 'loading',
	user: null
});

/**
 * Asks the server who the caller is. A 401 is signed out; anything else is the server being
 * unreachable. Calling it again is the retry: the status goes back to `loading` meanwhile.
 */
export async function loadSession(): Promise<void> {
	session.status = 'loading';
	try {
		session.user = await backend.me();
		session.status = 'ready';
	} catch (error) {
		session.user = null;
		session.status = error instanceof ApiError && error.status === 401 ? 'ready' : 'offline';
	}
}

export function setUser(user: User) {
	session.user = user;
	session.status = 'ready';
}

export async function signOut(): Promise<void> {
	await backend.logout().catch(() => undefined);
	session.user = null;
	session.status = 'ready';
}
