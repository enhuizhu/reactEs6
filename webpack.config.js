var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './App.js',
  output: { path: __dirname + '/public/', filename: 'bundle.js' },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module: {
    loaders: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015','react']
            }
        },
        {
            test: /\.scss$/,
            include: path.join(__dirname, 'public/styles'),
            loader: 'style!css!sass'
        }
    ]
 }
};
