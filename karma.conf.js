module.exports = function(config) {
  'use strict';
  config.set({
    basePath: '',
    frameworks: [
      'mocha',
      //'chai',
      //'sinon'
    ],
    files: [
      'test/*.js'
    ],
    exclude: [
      'karma.conf.js'
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    //logLevel: config.LOG_DEBUG,
    autoWatch: false,
    captureTimeout: 6000,
    singleRun: true,

    //browsers: ['PhantomJS', 'Chrome', 'Firefox']
    //browsers: ['PhantomJS', 'Firefox'],
    browsers: ['PhantomJS'],
    //browsers: ['Firefox'],

    plugins: [
        'karma-mocha',
        //'karma-chai',
        //'karma-sinon',
        //'karma-chrome-launcher',
        //'karma-firefox-launcher',
        'karma-phantomjs-launcher',
        //'karma-coverage'
    ]
  });
};
