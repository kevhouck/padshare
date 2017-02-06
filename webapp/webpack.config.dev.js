var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.js',
        'webpack/hot/only-dev-server',
        'webpack-dev-server/client?http://localhost:8081'
    ],
    output: {
        path: __dirname + '/dist',
        filename: "index_bundle.js",
        publicPath: "http://localhost:8080/assets/",
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "raw-loader" },
            { test: /\.js$/, exclude: [/node_modules/], loaders: ['babel']},
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool : 'source-map'
};