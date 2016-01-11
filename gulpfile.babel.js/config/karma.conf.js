/*
 * @title Karma
 * @description Karma configuration file
 */


/*********************************************************************************
 1. DEPENDENCIES
 *********************************************************************************/

import bowerFiles from 'main-bower-files';


/*********************************************************************************
 2. TASK
 *********************************************************************************/

module.exports = config => {

  let basePath = `${__dirname}/../..`;

  config.set({
    basePath: basePath,
    frameworks: ['jasmine'],
    files: bowerFiles().concat([
      'node_modules/babel-polyfill/dist/polyfill.js',
      `${sharedPaths.srcDir}/js/**/*.js`
    ]),
    browsers: ['PhantomJS'],
    preprocessors: {
      'src/js/**/*.js': ['babel'],
      'src/js/**/!(*spec).js': ['coverage']
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      reporters: [{
        type: 'html',
        dir: `${sharedPaths.outputDir}/reports/coverage/`,
        subdir: browser => {
          return browser.toLowerCase().split(/[ /-]/)[0];
        }
      }, {
        type: 'text-summary'
      }]
    },
    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      }
    }
  });

};