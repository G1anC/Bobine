<script lang="ts">
	import { Alert, AuthScreen, Button, Field, Icon, Input, Spinner } from '@facile/muse';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { backend, ssoLoginUrl, type AuthConfig } from '$lib/backend';
	import { BOBINE_ICON } from '$lib/icons';
	import { session, setUser } from '$lib/session.svelte';

	let config = $state<AuthConfig | null>(null);
	let canRegister = $state(false);
	let mode = $state<'login' | 'register'>('login');
	let name = $state('');
	let email = $state('');
	let password = $state('');
	let busy = $state(false);
	let error = $state(page.url.searchParams.get('error') ?? '');

	onMount(async () => {
		try {
			[config, canRegister] = await Promise.all([backend.authConfig(), backend.registrationOpen()]);
		} catch {
			error = 'Bobine cannot reach its server.';
		}
	});

	$effect(() => {
		if (session.user) void goto('/', { replaceState: true });
	});

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		busy = true;
		error = '';
		try {
			const credentials = { email, password, name };
			setUser(mode === 'register' ? await backend.register(credentials) : await backend.login(credentials));
		} catch (err) {
			error = err instanceof Error ? err.message : 'Sign-in failed.';
		} finally {
			busy = false;
		}
	}
</script>

<svelte:head><title>Sign in · Bobine</title></svelte:head>

{#snippet logo()}<Icon icon={BOBINE_ICON} size={28} class="text-fc-fg" />{/snippet}

{#if config?.sso_only}
	<AuthScreen appName="Bobine" href={ssoLoginUrl} signUpHref={null} {logo}>
		{#snippet notice()}
			{#if error}<Alert tone="danger">{error}</Alert>{/if}
		{/snippet}
	</AuthScreen>
{:else if config}
	<div class="flex min-h-dvh items-center justify-center bg-fc-page px-4 py-10">
		<form
			onsubmit={submit}
			class="flex w-full max-w-sm flex-col gap-5 rounded-fc-lg bg-fc-component p-6"
			aria-labelledby="sign-in-title"
		>
			<div class="flex items-center gap-3">
				{@render logo()}
				<h1 id="sign-in-title" class="text-fc-xl font-semibold text-fc-fg">
					{mode === 'register' ? 'Create your account' : 'Sign in to Bobine'}
				</h1>
			</div>
			{#if error}<Alert tone="danger">{error}</Alert>{/if}
			{#if mode === 'register'}
				<Field label="Name">
					{#snippet children({ id, describedBy })}
						<Input {id} aria-describedby={describedBy} bind:value={name} autocomplete="name" />
					{/snippet}
				</Field>
			{/if}
			<Field label="Email">
				{#snippet children({ id, describedBy })}
					<Input {id} aria-describedby={describedBy} type="email" bind:value={email} autocomplete="email" required />
				{/snippet}
			</Field>
			<Field label="Password" helper={mode === 'register' ? 'At least 12 characters.' : undefined}>
				{#snippet children({ id, describedBy })}
					<Input
						{id}
						aria-describedby={describedBy}
						type="password"
						bind:value={password}
						autocomplete={mode === 'register' ? 'new-password' : 'current-password'}
						minlength={mode === 'register' ? 12 : undefined}
						required
					/>
				{/snippet}
			</Field>
			<Button type="submit" size="lg" disabled={busy}>
				{mode === 'register' ? 'Create account' : 'Sign in'}
			</Button>
			{#if canRegister}
				<Button
					type="button"
					variant="ghost"
					size="lg"
					onclick={() => (mode = mode === 'login' ? 'register' : 'login')}
				>
					{mode === 'login' ? 'Create an account' : 'I already have an account'}
				</Button>
			{/if}
		</form>
	</div>
{:else}
	<div class="flex min-h-dvh items-center justify-center bg-fc-page">
		{#if error}<Alert tone="danger">{error}</Alert>{:else}<Spinner />{/if}
	</div>
{/if}
