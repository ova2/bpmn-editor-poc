// used to merge webpack configs
var webpackMerge = require('webpack-merge');
var validate = require('webpack-validator');
var commonConfig = require('./webpack.common.js');

var SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
// var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = validate(webpackMerge(commonConfig, {
    output:
    {
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    plugins: [
        new SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: ['app.css', 'manifest.js', 'globals.js']
        })
        /*,
        new UglifyJsPlugin({
            sourceMap: true,
            compress: {
                dead_code: true,
                unused: true,
                warnings: false,
                screw_ie8 : true
            },
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            output: {
                comments: false
            }
        })*/
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        contentBase: 'dist/',
        watchOptions: {
            aggregateTimeout: 100,
            poll: 300
        },
        stats: {
            colors: true
        }
    }
}));
