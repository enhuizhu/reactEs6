import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: './index.js',
  output: { path: __dirname + '/public/', filename: 'bundle.js' },
devServer:{
        contentBase: 'public',
         proxy: {
          '/cms': {
          target: 'https://eshop.dev/cms/',
          secure: false,
          hot: true,
          inline: true,
          watch: true,
           pathRewrite: {
            '^/cms': ''
          },
          changeOrigin: true,
          logLevel: 'debug',
        }
      }
    },
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
            loader: 'style-loader!css-loader!sass-loader'
        }
    ]
 }
};
