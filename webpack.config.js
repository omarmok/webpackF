/*jshint esversion: 6 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';
var cssDev =['style-loader', 'css-loader','sass-loader'];
cssProde = ExtractTextPlugin.extract({
  fallbackLoader: 'style-loader',
  loader: ['css-loader','sass-loader'],
  publicPath: './dist'
});
var cssConfig = isProd  ? cssProde :cssDev;

const path = require("path");

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig

            },
            {
              test: /\.(gif|png|jpe?g|svg)$/i,
              use: [
                // 'file-loader',
                'file-loader?name=img/[name][ext]', // to short
                // 'file-loader?name=[name].[ext]&outputPath=img/&publicPath=img/',  //  to make img title same name
                'image-webpack-loader'

               // use: 'file-loader?name[hash:6][name].[ext]&outputPath=img/' make img title  lenth

              ]
          }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        hot :true,
        stats: "errors-only", // to see error in terminal
        open: true
         // to open new tab evry run
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'custom title',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: './src/index.html',
        }),

        new HtmlWebpackPlugin({
          title: 'about',
          hash: true,
          filename: 'about.html',
          template: './src/about.html',
      }),


        new ExtractTextPlugin({
            filename: './css/app.css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};


