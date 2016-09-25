'use strict';

module.exports = config => {
    config.set({
        autoWatch: true,
        browsers: ['Chrome', 'PhantomJS'],
        /*
         * list of files to load in the browser is built via spec-bundle.js
         */
        files: [
            'spec-bundle.js'
        ],
        exclude: [],
        frameworks: ['jasmine'],
        logLevel: config.LOG_INFO,
        phantomJsLauncher: {
            exitOnResourceError: true
        },
        port: 9876,
        colors: true,
        preprocessors: {
            'spec-bundle.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        singleRun: true,
        webpack: require('./webpack.test.js'),
        webpackServer: {
            noInfo: true
        }
    });
};
