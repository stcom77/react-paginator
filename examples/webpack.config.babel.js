import path from 'path';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './examples/index.js',
  output: {
    filename: './examples/dist/index.js'
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, ".."),
        query: {
          presets: ["react", "es2015-webpack2", "stage-1"],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.less$/,
        loader: ["style-loader","css-loader","less-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./styles.css'),
  ],
};
