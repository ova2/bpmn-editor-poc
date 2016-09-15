var path = require('path');
var autoprefixer = require('autoprefixer');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
var HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');

var ROOT = path.resolve(__dirname, '..');
var CHUNKS_SORT_ORDER = ['manifest', 'globals', 'app'];

// Common configuration for development and production
module.exports = {
    entry: {
        'globals': './globals.ts',
        'app':     './app.ts'
    },
    output: {
        path: path.join(ROOT, 'dist')
    },
    context: path.join(ROOT, 'src'),
    // See https://medium.com/webpack/harnessing-the-power-of-webpack-2cd0e20ff1bf#.q9do1u54o
    recordsPath: path.join(ROOT, 'config', 'webpack-records.json'),
    resolve: {
        extensions: ['', '.ts', '.js', '.json']
    },
    module: {
       /*
        preLoaders: [{

            // TSlint loader support for *.ts files
            // https://github.com/wbuchwalter/tslint-loader
            test: /\.ts$/,
            loader: 'tslint',
            exclude: [path.join(ROOT, 'node_modules')]
        }],
        */
        loaders: [{
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader']
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'raw'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: "style",
                loader: "css"
            })
        }, {
            test: /\.scss/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: "style",
                loader: "css!postcss!sass"
            }),
            exclude: /^\_.*\.scss/
        }, {
            test: /\.(png|jpe?g|gif)$/i,
            loaders: ['file?name=[path][name].[ext]', 'image-webpack']
        }, {
            test: /\.(woff2?|ttf|eot|svg)$/,
            loader: 'url?limit=10000'
        }]
    },
    postcss: function () {
        // try the jquery for browsers here - http://browserl.ist/
        return [autoprefixer({browsers: ['last 3 versions']})];
    },
    plugins: [
        // new ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery"
        // }),
        new CommonsChunkPlugin({
            name: ['app', 'globals']
        }),
        // move webpack runtime code to a separate manifest file in order to support long-term caching.
        // this will avoid hash recreation for other files when only application files are changed.
        new CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: "[name].css"
        }),
        new HashedModuleIdsPlugin(),
        new WebpackMd5Hash(),
        new OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            minify: {
                removeComments: true
            },
            chunksSortMode: function (a, b) {
                var idxA = CHUNKS_SORT_ORDER.indexOf(a.names[0]);
                var idxB = CHUNKS_SORT_ORDER.indexOf(b.names[0]);
                return idxA - idxB;
            }
        })
    ]
};
