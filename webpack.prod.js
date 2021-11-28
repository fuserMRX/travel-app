// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        //  dont need to be initialized in the plugin list below!!!
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /\.scss$/i,
                exclude: /(node_modules)/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ]
    },
    plugins: [
        // Extract all css files in one file
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new WorkboxPlugin.GenerateSW(),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
        }),
    ],
});