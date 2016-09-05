// used to merge webpack configs
var webpackMerge = require('webpack-merge');
var validate = require('webpack-validator');
var commonConfig = require('./webpack.common.js');

var SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');

module.exports = validate(webpackMerge(commonConfig, {
    output:
    {
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
//    tslint:
//    {
//        emitErrors: false,
//        failOnHint: false
//    },
    plugins: [
        new SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: ['vendor.css', 'app.css', 'manifest.js', 'polyfills.js', 'vendor.js']
        })
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
