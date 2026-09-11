const { defineConfig } = require('cypress');

module.exports = defineConfig({
    reporter: 'mochawesome',

  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
    inlineAssets: true
},

    e2e: {
        baseUrl: 'https://www.sesc.com.br',
        experimentalOriginDependencies: true,

        setupNodeEvents(on, config) {
            return config;
        }
    }
});