const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const argv = require('yargs').argv;
const baseWebpackConfig = require('./webpack.base');
const config = require('./config');
const { resolve } = require('./utils');

const bundleAnalyzerReport = argv.report;

const webpackConfig = merge.smart(baseWebpackConfig, {
    mode: 'production',
    entry: {
        app: './src/index.tsx',
        // vendor: ['react', 'react-dom'] // 不变的代码分包
    },
    output: {
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].js',
        path: config.assetsRoot,
        publicPath: config.publicPath
    },
    optimization: {
        splitChunks: {
            chunks: 'all', // 哪些块进行优化，"initial"|"all"|"async"(默认) (string function)
            minSize: 30000, // 要生成的块的最小大小，默认30000(30k)
            minChunks: 2, // 分割前必须共享模块的最小块数，默认1
            name: true, // 拆分快的名称，默认true(function true string)
            cacheGroups: {
                vendors: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    name: 'common',
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    // optimization: {
    //     minimizer: [
    //         new UglifyjsWebpackPlugin({
    //             sourceMap: false
    //         })
    //     ],
    //     splitChunks: {
    //         chunks: 'all',
    //         minChunks: 2,
    //         maxInitialRequests: 5,
    //         cacheGroups: {
    //             // 提取公共模块
    //             commons: {
    //                 chunks: 'all',
    //                 test: /[\\/]node_modules[\\/]/,
    //                 minChunks: 2,
    //                 maxInitialRequests: 5,
    //                 minSize: 0,
    //                 name: 'common'
    //             }
    //         }
    //     }
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve('./public/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeOptionalTags: false,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeScriptTypeAttributes: true,
                removeAttributeQuotes: true,
                removeCommentsFromCDATA: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
            threshold: 10240, // 大于这个大小的文件才会被压缩
            minRatio: 0.8
        }),
    ]
});

if (bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
