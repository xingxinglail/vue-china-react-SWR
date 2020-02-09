const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const config = require('./config');
const { resolve } = require('./utils');
const { getCssLoaders } = require('./cssLoaders');
const getClientEnvironment = require('./env');

const devMode = process.env.NODE_ENV === 'development';
const testMode = process.env.NODE_ENV === 'test';

const env = getClientEnvironment(config.publicPath);

const eslintRules = {
    enforce: 'pre',
    test: /\.tsx?$/,
    exclude: /node_modules/,
    include: [resolve('src')],
    loader: 'eslint-loader',
    options: {
        emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
        emitError: true, // 这个配置需要打开，才能在控制台输出error信息
        fix: false // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
    }
};

module.exports = {
    entry: {
        app: resolve('./src/index.tsx'),
    },
    output: {
        publicPath: config.publicPath
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'] // 自动判断后缀名，引入时可以不带后缀
    },
    module: {
        rules: [
            testMode ? {} : eslintRules,
            {
                oneOf: [
                    {
                        test: /\.(html)$/,
                        loader: 'html-loader'
                    },
                    {
                        test: /\.(j|t)sx?$/,
                        include: resolve('src'),
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        '@babel/preset-react', // jsx支持
                                        ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 2 }] // 按需使用polyfill
                                    ],
                                    cacheDirectory: true
                                }
                            },
                            {
                                loader: 'awesome-typescript-loader'
                            }
                        ]
                    },
                ]
            },
            getCssLoaders(devMode),
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            },
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[contenthash:7].[ext]',
                    outputPath: config.assetsDirectory
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[contenthash:7].[ext]',
                    outputPath: config.assetsDirectory
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[contenthash:7].[ext]',
                    outputPath: config.assetsDirectory
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[contenthash:8].css',
            chunkFilename: devMode ? '[id].css' : '[id].[contenthash:8].css',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: resolve('./public/index.html'),
            showErrors: true
        }),
        new InterpolateHtmlPlugin(env.raw),
        new webpack.DefinePlugin(env.stringified),
        new CopyWebpackPlugin([
            {
                from: 'public',
                ignore: ['index.html']
            }
        ])
    ]
};
