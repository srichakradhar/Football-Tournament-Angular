// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions:{
      args: ["--headless", "--disable-gpu", "--window-size=800x600"]
    }
  },
  chromeDriver:'../node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_78.0.3904.108',
  directConnect: true,
  baseUrl: 'http://localhost:8003/',
  framework: 'jasmine',
  browsers:['ChromeHeadless'],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    let jasmineReporters  = require('jasmine-reporters');
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter(null,true,true));
  }
};