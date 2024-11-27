import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'skeleton-App',
  webDir: 'www',
  plugins: {
    microphone: {
      permissions: {
        ios: {
          microphone: []
        },
        android: {
          permissions: ['android.permission.RECORD_AUDIO']
        }
      }
    }
  }
};

export default config;
