const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const miniCssExtractPluginLoader = (devMode) => {
    return {
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: devMode
        }
    };
};

const cssLoader = {
    loader: 'css-loader',
    options: {
        modules: {
            localIdentName: '[name]_[local]_[hash:base64:5]',
        }
    }
};

const sassLoader = {
    loader: 'sass-loader',
    options: {
        implementation: require('sass')
    }
};

const postcssLoader = 'postcss-loader';

const getCssLoaders = (devMode) => {
    const loaders = devMode ? [miniCssExtractPluginLoader(devMode), cssLoader, sassLoader] : [miniCssExtractPluginLoader(devMode), cssLoader, postcssLoader, sassLoader];

    return {
        test: /\.(sc|c)ss$/,
        use: loaders
    };
};

module.exports = {
    getCssLoaders
};
