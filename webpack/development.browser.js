'use strict';

/**
 * --watch перерезагружает при изменениях в entry файлах
 * --debug Switch loaders to debug mode, false
 * --progress Print compilation progress in percentage, false
 * --watch, -w Watch the filesystem for changes
 * --save, -s Recompiles on save regardless of changes
 * --optimize-minimize Minimize javascript and switches loaders to minimizing
 * --display-chunks Display chunks in the output
 * --display-entrypoints Display entry points in the output
 * --display-error-details Display details about errors
 * -d --debug --devtool eval-cheap-module-source-map --output-pathinfo. НЕ ИСПОЛЬЗОВАТЬ -d шорткат! eval-cheap-module-source-map делает херовые .map
 * -p --optimize-minimize --define process.env.NODE_ENV="production", see building for production
 * -c --colors
 * --display-depth displays the distance to the entry point for each module.
 *
 *     wp2
 *     NODE_ENV='development' node_modules/.bin/webpack --config webpack.conf.js --debug --progress --output-pathinfo --display-depth --devtool --colors --display-chunks --watch
 *     NODE_ENV='production' node_modules/.bin/webpack --config webpack.conf.js -p --progress --display-depth --colors --display-chunks
 *
 *     wp1
 *     NODE_ENV='development' webpack --config webpack.conf.js -sdc --progress --display-error-details --display-chunks --watch
 *     NODE_ENV='production' webpack --config webpack.conf.js -spc --progress --display-error-details --display-chunks
 */

const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const config = require('./../config');
// let i18n = require('../routes/i18n');

/* Для обычного .scss (не .local.scss) Сохраняю use:[] массив. Это конфиг без ExtractTextPlugin */
let scssUse = [
    // 'style-loader?singleton&-sourceMap',
    'css-loader?modules&importLoaders=1&-minimize&localIdentName=[local]',
    {
        loader: 'postcss-loader',
        options: {
            plugins: function () {
                return [
                    // require('precss'),
                    require('autoprefixer')
                ];
            }
        }
    },
    'sass-loader',
]

/* Для .local.scss (обычный .scss выше) Сохраняю use:[] массив. Это конфиг без ExtractTextPlugin */
let scssLocalUse = [
    // 'style-loader?singleton&-sourceMap',
    'css-loader?modules&importLoaders=1&-minimize&localIdentName=[local]_[hash:3]',
    {
        loader: 'postcss-loader',
        options: {
            plugins: function () {
                return [
                    // require('precss'),
                    require('autoprefixer')
                ];
            }
        }
    },
    'sass-loader',
];

let cssUse = [
    'css-loader?modules&-minimize&-sourceMap',
    {
        loader: 'postcss-loader',
        options: {
            plugins: function () {
                return [
                    // require('precss'),
                    require('autoprefixer')
                ];
            }
        }
    },
]



module.exports = {
    context: path.resolve(__dirname, '..'),
    entry: {
        'index': path.resolve(__dirname, '..', 'src/js/browser.js'), // реакт версия, \src\js\ep_browser.js
        'sdk': path.resolve(__dirname, '..', 'src/js/sdk.js'),
        'sa_widget': path.resolve(__dirname, '..', 'src/js/sa_widget.js'),
        'vendors': [
            // 'jquery',
            'react',
            'react-dom',
            // 'react-redux',
            // 'react-router',
            // 'redux-thunk',
            // 'redux-logger',
            // 'react-addons-css-transition-group',
            // 'classnames',
        ]
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '..', 'public'),
        publicPath: '',
        pathinfo: true,
        sourceMapFilename: "[file].map",
        devtoolModuleFilenameTemplate: "webpack:///[resource-path]?[id]",
        libraryTarget: "umd",
        library: ['AS'],
    },
    module: {
        rules: [
            /* .local.scss */
            {
                // test: /^.*\.local\.scss$/i, // is a shortcut to Rule.resource.test
                // exclude: '', // is a shortcut to Rule.resource.exclude
                // include: '', //  is a shortcut to Rule.resource.include
                resource: {
                    test: /^.*\.local\.scss$/i,
                    // exclude: '',
                    include: [
                        path.resolve(__dirname, '..', 'node_modules'),
                        path.resolve(__dirname, '..', 'src/sass'),
                    ]
                },
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: scssLocalUse,
                }),
                // enforce: '',
            },
            /* .scss */
            /* @include ([^\(]+)\((.+)\);  $1: $2; */
            {
                resource: {
                    test: /^((?!\.local).)*scss$/i,
                    // exclude: '',
                    include: [
                        path.resolve(__dirname, '..', 'node_modules'),
                        path.resolve(__dirname, '..', 'src/sass')
                    ]
                },
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: scssUse,
                }),
            },
            /* .css */
            {
                resource: {
                    test: /\.css$/i,
                    // exclude: '',
                    include: [
                        path.resolve(__dirname, '..', 'node_modules', 'bootstrap/scss'),
                        path.resolve(__dirname, '..', 'node_modules'),
                        path.resolve(__dirname, '..', 'src/sass'),
                    ],
                },
                // use: cssUse,
                use: ExtractTextPlugin.extract({
                    // fallback: 'style-loader',
                    use: cssUse,
                }),
            },
            /* .js */
            {
                // test: /^.*\.local\.scss$/i, // is a shortcut to Rule.resource.test
                // exclude: '', // is a shortcut to Rule.resource.exclude
                // include: '', //  is a shortcut to Rule.resource.include
                resource: {
                    test: /\.js$/,
                    // exclude: path.join(__dirname, '..', 'node_modules'),
                    include: [
                        path.resolve(__dirname, '..', 'node_modules'),
                        path.resolve(__dirname, '..', 'src/js')
                    ]
                },
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["latest", "stage-0", "react"],
                        code: true,
                        comments: false,
                        cacheDirectory: true,
                        // compact: true,
                        // inputSourceMap: true,
                        // sourceMaps: 'both',
                        // sourceMapTarget: 'file'
                    }
                }],
                // enforce: '',
            },
            /* .png|woff|woff2|eot|ttf|svg */
            {
                resource: {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                },
                use: ['url-loader?limit=100000'],
                // enforce: '',
            },
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, '..', 'node_modules'),
            path.resolve(__dirname, '..', 'node_modules/bootstrap-sass/assets/stylesheets'),
            path.resolve(__dirname, '..', 'src/js'), // src/js
            path.resolve(__dirname, '..', 'src/sass'), // src/sass
            path.resolve(__dirname, '..', 'src/img') // src/img
            // path.resolve(__dirname, "..", "node_modules/compass-mixins/lib"),
        ],
        extensions: ['*', '.js', '.jsx', '.react', '.scss', '.json', '.jpeg', '.jpg', '.png', '.gif', '.svg', '.dust', '.css', '.less'],
    },
    resolveLoader: {},
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
        // new webpack.optimize.CommonsChunkPlugin({
        //     // name: "public/js/vendors",
        //     // name: 'vendors',
        //     names: ["commons", "vendors"],
        //     filename: "js/[name].js",
        //     minChunks: Infinity
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        // new I18nPlugin(i18n, {functionName: 'i18n'}),
        new ExtractTextPlugin({
            // filename: path.resolve(__dirname, '..', 'public/css/[name].css'), // "./../css/[name].css"
            filename: "css/[name].css",
            allChunks: true,
            disable: false
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            minimize: false,
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         drop_console: true,
        //         dead_code: true,
        //         drop_debugger: true,
        //         conditionals: true,
        //         booleans: true,
        //         loops: true,
        //         unused: true,
        //         if_return: true,
        //         join_vars: true,
        //         warnings: false
        //     }
        // }),
        // new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery", "window.jQuery": "jquery" }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("development")
            }
        }),
    ],
    target: 'web',
    devtool: 'cheap-module-source-map',
}
