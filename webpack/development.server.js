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

/* для удобства вынес наверх */
let app = [
    'App.js',
    'server.js',
    'routes.js',
    'Store.js',
    'stateTree.js',
    'sdk.js',
    'widget.js'
]

/* .scss */
let scssUse = [
    'css-loader/locals?modules&importLoaders=1&-minimize&-sourceMap&localIdentName=[local]',
    'sass-loader',
];

/* .local.scss */
let scssLocalUse = [
    'css-loader/locals?modules&importLoaders=1&-minimize&localIdentName=[local]_[hash:3]',
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
    'css-loader?modules&-minimize&-sourceMap'
]

module.exports = {
    context: process.cwd(),
    entry: {
        // prov: path.resolve(__dirname, '..', 'src/js' + path.sep + app[1]), // менять цифру
        sdk: path.resolve(__dirname, '..', 'src/js' + path.sep + app[5]),
        // routes: path.resolve(__dirname, '..', 'src/js' + path.sep + app[2]),
        // store: path.resolve(__dirname, '..', 'src/js' + path.sep + app[3]),
        // state: path.resolve(__dirname, '..', 'src/js' + path.sep + app[4]),
        // widget: path.resolve(__dirname, '..', 'src/js' + path.sep + app[6]),
    },
    /**
     * [id], [name], [hash], [chunkhash], [file]
     */
    output: {
        // libraryTarget: 'commonjs2', // Export by setting module.exports: module.exports = xxx
        libraryTarget: "umd",
        library: ['AS'],
        path: path.resolve(__dirname, '..', 'dist/js'),
        // path: path.resolve(__dirname, '..', 'public/js'),
        // chunkFilename: path.resolve(__dirname, '..', config[NODE_ENV].assets_path.react, '..', 'chunkFilename.js'),
        // chunkFilename: '[id].js',
        // chunkFilename: '[id]-[chunkhash].js',
        // filename: path.resolve(__dirname, '..', config[NODE_ENV].assets_path.react, '..', 'bundle.js')
        filename: '[name].js',
        pathinfo: true,
        // devtoolModuleFilenameTemplate: "webpack:///[resource-path]?[id]"
        sourceMapFilename: "[file].map"
    },
    module: {
        /* IMPORTANT: The loaders here are resolved relative to the resource which they are applied to */
        rules: [
            /* .local.scss */
            {
                resource: {
                    test: /^.*\.local\.scss$/i,
                    // exclude: '',
                    include: [
                        path.resolve(__dirname, '..', 'src/sass'),
                    ]
                },
                use: scssLocalUse,
                // enforce: '',
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
                use: cssUse,
                // use: ExtractTextPlugin.extract({
                //     // fallback: 'style-loader',
                //     use: cssUse,
                // }),
            },
            /* .scss */
            {
                resource: {
                    test: /^((?!\.local).)*scss$/i,
                    // exclude: '',
                    include: [
                        path.resolve(__dirname, '..', 'src/sass'),
                        path.resolve(__dirname, '..', 'node_modules')
                    ],
                },
                // use: ExtractTextPlugin.extract({
                //     // fallback: 'style-loader',
                //     use: scssUse,
                // }),
                use: scssUse
            },
            /* .js */
            {
                resource: {
                    test: /\.js$/,
                    // exclude: path.join(__dirname, '..', 'node_modules'),
                    include: [
                        path.join(__dirname, '..', 'node_modules'),
                        path.resolve(__dirname, '..', 'src/js')
                    ]
                },
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["latest", "stage-0", "react"],
                        code: true,
                        comments: false,
                        compact: true,
                        minified: true,
                        cacheDirectory: true,
                        // inputSourceMap: true,
                        // sourceMaps: false
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
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, '..', 'node_modules'),
            // path.resolve(__dirname, '..', 'node_modules/react-dates/css'),
            path.resolve(__dirname, '..', 'node_modules/bootstrap-sass/assets/stylesheets'),
            path.resolve(__dirname, '..', 'src/js'), // src/js
            path.resolve(__dirname, '..', 'src/sass'), // src/sass
            path.resolve(__dirname, '..', 'src/img'), // src/img
            // path.resolve(__dirname, "..", "node_modules/compass-mixins/lib"),
        ],
        extensions: ['*', '.js', '.jsx', '.react', '.scss', '.json', '.jpeg', '.jpg', '.png', '.gif', '.svg', '.dust', '.css', '.less'],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true,
            minimize: false,
        }),
        // new I18nPlugin(i18n, {functionName: 'i18n'}),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         // drop_console: true,
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
        new ExtractTextPlugin({
            // filename: path.resolve(__dirname, '..', 'public/css/[name].css'), // "./../css/[name].css"
            filename: 'public/css/[name].css',
            allChunks: true,
            disable: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("development")
            }
        }),
    ],
    /**
     * Не обязательно
     */
    resolveLoader: {},
    target: 'node',
    devtool: 'eval',
};
