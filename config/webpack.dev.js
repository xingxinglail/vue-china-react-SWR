const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const config = require('./config');
const { resolve } = require('./utils');

module.exports = merge.smart(baseWebpackConfig, {
    mode: 'development',
    output: {
        filename: 'js/[name].[hash:8].js',
        publicPath: '/'
    },
    devServer: {
        host: 'localhost',
        contentBase: resolve('../public'),
        watchContentBase: true,
        publicPath: '/',
        compress: true,
        historyApiFallback: true,
        hot: true,
        clientLogLevel: 'error',
        open: true,
        overlay: false,
        quiet: false,
        noInfo: false,
        watchOptions: {
            ignored: /node_modules/
        },
        proxy: {}
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
