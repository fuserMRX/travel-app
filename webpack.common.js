// file to get all similiar cases between prod and development
// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // @babel/polyfill is added to remove error "regeneratorRuntime is not defined"
    // and create ability to use async await
    entry: ['@babel/polyfill','./src/client/index.js'],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        // Webpack 5 approach to clean dist directory
        clean: true,
        // exposed entry
        library: {
            name: 'Client',
            type: 'umd',
        },
        // publicPath: '/src/assets/',
        // libraryTarget is not relevant any more - output.library.type is enough
        // assetModuleFilename: './src/assets/images/[name].[ext]',
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        // enables to check eslint errors during the build
        new ESLintPlugin({
            files: 'src/**/*.js',
        }),
        new HtmlWebpackPlugin({
            // Chrome does not see simple favicon.ico on the localhost - firefox is doing great with it :(
            // solution - just to change name instead of general 'favicon.ico'
            favicon: './src/assets/travel_app_favicon.ico',
            template: './src/client/views/index.html',
            filename: './index.html',
        }),
    ],
};