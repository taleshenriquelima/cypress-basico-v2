const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  projectId: '5a98y5',
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
  configFile: 'reporter-config.json',
  },
  e2e: {
    setupNodeEvents(on, config) {
    { "reporter"; "mochawesome", 
        "reporterOptions"; 
          { "reportDir"; "cypress/report/mochawesome-report", 
           "overwrite"; false, 
           "html"; true, 
           "json"; false, 
           "timestamp"; "mmddyyyy_HHMMss" }} 
    allureWriter(on, config) 
    allureCypress(on, {
      resultsDir: "./allure-results",
      links: [
        { type: "issue", urlTemplate: "https://issues.example.com/%s" },
        { type: "tms", urlTemplate: "https://tms.example.com/%s" },
        ],
      }); 
    },       
  specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  video: true
  },
})