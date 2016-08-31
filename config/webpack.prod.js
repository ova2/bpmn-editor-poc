// used to merge webpack configs
var webpackMerge = require('webpack-merge');
var validate = require('webpack-validator');
var commonConfig = require('./webpack.common.js');

var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = validate(webpackMerge(commonConfig, {
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    bail: true,
    tslint: {
        emitErrors: true,
        failOnHint: true
    },
    plugins: [
        new DedupePlugin(),
        new ExtractTextPlugin({
            filename: "[name].[chunkhash].css"
        }),
        new UglifyJsPlugin({
            minimize: true,
            mangle: {
                screw_ie8: true
            },
            compress: {
                warnings: true,
                screw_ie8 : true
            },
            output: {
                comments: false
            },
            // drop 'console' statements
            drop_console: true
        })
    ]
}));