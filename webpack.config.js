/*eslint-env node*/
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NODE_ENV = process.argv.indexOf('--optimize-minimize') > -1;

module.exports = {
    entry: './src',
    output: {
        filename: 'app.js',
        path: __dirname + '/build'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    __dirname + '/src'
                ],
                use: [
                    { loader: 'babel-loader'}
                ]
            },
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/
                ],
                use: [{
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: 'static/media/[name].[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        })
    ],
    devServer: {
        port: 3000,
        contentBase: __dirname + '/build'
    }
};
