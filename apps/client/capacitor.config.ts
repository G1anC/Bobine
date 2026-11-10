import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'studio.facile.bobine',
	appName: 'Bobine',
	webDir: 'build',
	android: { allowMixedContent: false },
	server: { androidScheme: 'https' }
};

export default config;
