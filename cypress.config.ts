import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export default defineConfig({
  allowCypressEnv: true,
  e2e: {
    // baseUrl: 'https://www.mvideo.ru/', o avoid conclifct of 2 baseUrls
    specPattern: 'tests/{api,ui}/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    projectId: 'jv8m7o',
    defaultCommandTimeout: 4000,
    pageLoadTimeout: 30000,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-blink-features=AutomationControlled');
          launchOptions.args.push(
            '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
          );
        }

        return launchOptions;
      });

      // Explicitly copy process.env to config.env
      config.env = {
        ...config.env,
        CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
      };

      return config;
    },
  },
});
