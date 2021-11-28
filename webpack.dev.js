// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: {
            // ability to serve static files - img, videos, bundled file
            directory: path.join(__dirname, './dist'),
        },
        client: {
            progress: true,
        },
        compress: true,
        port: 8080,
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
                test: /\.s[ac]ss$/i,
                exclude: /(node_modules)/,
                // style-loader is used for inline approach which is not so good for prod
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
        }),
    ],
});