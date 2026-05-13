import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.remarket.app',
  appName: 'ReMarket',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
