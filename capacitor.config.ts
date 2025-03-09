import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.scheub.customercards',
  appName: 'CardMaster',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  
};

export default config;