import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: 'https://sharp.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    projectId: 'jv8m7o',
    defaultCommandTimeout: 4000,
    pageLoadTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
