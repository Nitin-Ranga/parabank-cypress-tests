// Cypress configuration file for end-to-end testing
// This configuration is set up to work with the Sauce Labs demo application
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    // Enable experimental features for better session support
    experimentalSessionAndOrigin: true,
    experimentalMemoryManagement: true,
    
    // Configure retries for more reliable tests
    retries: {
      runMode: 1,
      openMode: 0
    },
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  
  // Disable Chrome web security to allow session persistence
  chromeWebSecurity: false,
  
  // Increase timeout for session setup
  defaultCommandTimeout: 10000,
  
  // Store screenshots for debugging
  screenshotOnRunFailure: true,
  
  // Configure viewport
  viewportWidth: 1280,
  viewportHeight: 720,
})




