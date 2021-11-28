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
        }
        // libraryTarget is not relevant any more - output.library.type is enough
    },
    plugins: [
        // enables to check eslint errors during the build
        new ESLintPlugin({
            files: 'src/**/*.js',
        }),
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html',
        }),
    ],
};