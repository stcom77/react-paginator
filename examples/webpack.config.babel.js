import path from 'path';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const fontLoader = {
  loader: 'file-loader',
  query: {
    name: './dist/assets/fonts/[name].[ext]'
  }
};

const assetsPath = ".";

module.exports = {
  entry: './examples/index.js',
  output: {
    filename: 'index.js',
    publicPath: '/dist/',
    path: './examples/dist/'
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
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          mimetype: 'application/font-woff',
          name: `${assetsPath}/fonts/[name].[ext]`
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          mimetype: 'application/font-woff2',
          name: `${assetsPath}/fonts/[name].[ext]`
        }
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          mimetype: 'application/x-font-opentype',
          name: `${assetsPath}/fonts/[name].[ext]`
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          mimetype: 'application/x-font-truetype',
          name: `${assetsPath}/fonts/[name].[ext]`
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          name: `${assetsPath}/fonts/[name].[ext]`,
          mimetype: 'application/vnd.ms-fontobject',
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./styles.css'),
  ],
};
