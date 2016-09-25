// used to merge webpack configs
var webpackMerge = require('webpack-merge');
var validate = require('webpack-validator');
var commonConfig = require('./webpack.common.js');

var ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");

// we don't need entry points, output and other stuff for Karma tests
delete commonConfig.entry;
delete commonConfig.output;
delete commonConfig.context;
delete commonConfig.recordsPath;
delete commonConfig.module;
delete commonConfig.postcss;
delete commonConfig.plugins;

module.exports = validate(webpackMerge(commonConfig, {
    /**
     * Source map for Karma. Don't change, leave as is or it wont work.
     * See: https://github.com/webpack/karma-webpack#source-maps
     */
    devtool: 'inline-source-map',
    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader']
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(css|html)$/,
            loader: 'raw'
        }]
    },
    plugins: [
        new ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        )
    ]
}));
