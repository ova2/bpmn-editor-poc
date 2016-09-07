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
            compress: {
                dead_code: true,
                unused: true,
                warnings: false,
                screw_ie8: true
            },
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            output: {
                comments: false
            },
            drop_console: true
        })
    ]
}));