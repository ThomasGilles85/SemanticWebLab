// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('@angular/cli/plugins/karma')
    ],
    files: [
      { pattern: './src/test.ts' }
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli']
    },
    typescriptPreprocessor: {
      options: {
        sourceMap: true, // generate source maps
        noResolve: false // enforce type resolution
    }},
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'karma-remap-istanbul']
              : ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome_without_security'],
    singleRun: false,
    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    }
  },);
};
