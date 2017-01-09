const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: './dist',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ["react", "es2015-webpack2", "stage-1"],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: ["css-loader","less-loader"]
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./styles.css'),
  ],
};

