var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './App.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            }
        ]
    }
};
