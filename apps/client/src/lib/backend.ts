import { apiBase, clearToken, getToken, isApp, setToken } from '$lib/platform';

const base = apiBase();

export type User = { id: string; email: string; name: string; avatar_url?: string };
export type AuthConfig = { sso_only: boolean; oidc_enabled: boolean };
export type Credentials = { email: string; password: string; name?: string };

type Session = { token: string; user: User };
type ErrorPayload = { error?: { message?: string } };

export const ssoLoginUrl = `${base}/auth/oidc`;

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

/**
 * Adds the credential a request needs: the bearer token in a packaged app, and in a browser
 * the session cookie plus the header porte requires on anything that changes state.
 */
async function authed(options: RequestInit): Promise<RequestInit> {
	const headers = new Headers(options.headers);
	if (options.body) headers.set('Content-Type', 'application/json');
	if (isApp()) {
		const token = await getToken();
		if (token) headers.set('Authorization', `Bearer ${token}`);
		return { ...options, headers };
	}
	if (options.method && options.method !== 'GET') headers.set('X-Facile-CSRF', '1');
	return { ...options, headers, credentials: 'same-origin' };
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
	const response = await fetch(`${base}${path}`, await authed(options));
	if (response.status === 401) await clearToken();
	if (!response.ok) {
		const payload = (await response.json().catch(() => undefined)) as ErrorPayload | undefined;
		throw new ApiError(payload?.error?.message || `Request failed (${response.status})`, response.status);
	}
	if (response.status === 204) return undefined as T;
	return (await response.json()) as T;
}

async function signIn(path: string, credentials: Credentials): Promise<User> {
	const session = await apiFetch<Session>(path, { method: 'POST', body: JSON.stringify(credentials) });
	await setToken(session.token);
	return session.user;
}

export const backend = {
	authConfig: () => apiFetch<AuthConfig>('/auth/config'),
	registrationOpen: async () => (await apiFetch<{ open: boolean }>('/auth/registration')).open,
	me: async () => (await apiFetch<{ user: User }>('/auth/me')).user,
	login: (credentials: Credentials) => signIn('/auth/login', credentials),
	register: (credentials: Credentials) => signIn('/auth/register', credentials),
	async logout() {
		try {
			await apiFetch<unknown>('/auth/logout', { method: 'POST' });
		} finally {
			await clearToken();
		}
	}
};
