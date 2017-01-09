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
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          mimetype: 'application/font-woff',
          outputPath: '../dist/assets/fonts',
          name: './dist/assets/[name].[ext]'        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          mimetype: 'application/font-woff2'
        }
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          mimetype: 'application/x-font-opentype'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          mimetype: 'application/x-font-truetype'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          mimetype: 'application/vnd.ms-fontobject',
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./styles.css'),
  ],
};

