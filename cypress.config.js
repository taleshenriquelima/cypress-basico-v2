const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  projectId: '5a98y5',
  e2e: {
    setupNodeEvents(on, config) {
    allureWriter(on, config);  //AQUI COLOCAR PARA CCHAMAR O ALLURE ESSA LINHA
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    
  },

})
