/*jshint esversion: 6 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const isProd = process.env.NODE_ENV === 'production';
const cssDev =['style-loader', 'css-loader','sass-loader'];
cssProde = ExtractTextPlugin.extract({
  fallbackLoader: 'style-loader',
  loader: ['css-loader?minimize=true','sass-loader',],
  publicPath: './dist',

});
const cssConfig = isProd  ? cssProde :cssDev;

const path = require("path");

module.exports = {

    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/app.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
              test: /\.(gif|png|jpe?g|svg|)$/i,
              use: [
                // 'file-loader',
                // 'file-loader?name=img/[name].[ext]',
                // to short
                'file-loader?name=[name].[ext]&outputPath=./img/&publicPath=./img',
                //  to make img title same name
                //  'file-loader?name[hash:6][name][ext]&outputPath=/img/',
                // make img title  lenth

                'image-webpack-loader',
              ]
          },


          {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: [
              'file-loader?name=[name].[ext]&outputPath=./fonts/&publicPath=/fonts/',
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
            minify: {
                collapseWhitespace: true
            },
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
           filename: './css/app.[hash:7].css',
           disable: !isProd,
           allChunks: true,



        }),
        new webpack.HotModuleReplacementPlugin(),
        new PurifyCSSPlugin({
          paths: glob.sync(path.join(__dirname, 'src/*.html')),
          minimize:true
        })
    ]
};


