const { CapacitorConfig } = require('@capacitor/cli');

const config = {
  appId: 'apps.pantanjali.milloperations',
  appName: 'MillOperations',
  webDir: 'dist/spa',
  server: {
    androidScheme: 'http'
  },
  plugins: {
    axios: {
      webPlugin: 'axios',
    }
  }
};

module.exports = config;
