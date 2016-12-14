const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// App files location
const PATHS = {
  app: path.resolve(__dirname, '../src'),
  config: path.resolve(__dirname, '../src/config.api.js'),
  entry: path.resolve(__dirname, '../src/index.js'),
  styles: path.resolve(__dirname, '../src/styles'),
  images: path.resolve(__dirname, '../src/images'),
  build: path.resolve(__dirname, '../build')
};

const plugins = [
  new HtmlWebpackPlugin({
    template: PATHS.app + '/index.html',
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  fs.existsSync(PATHS.config) ?
    new CopyWebpackPlugin([{
      from: PATHS.app + '/config.api.js',
      to: PATHS.build + '/js/config.api.js'
    }]) :
    new CopyWebpackPlugin(),
  // Shared code
  // new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'js/vendor.bundle.js'}),
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.VERSION': JSON.stringify(require('../package.json').version),
    '__DEV__': JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
    '__DEMO__': JSON.stringify(false),
  }),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
];

module.exports = {
  entry: {
    app: PATHS.entry,
    vendor: ['react'],
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    publicPath: '/',
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['.js', '.jsx', '.scss', '.css']
  },
  target: 'web',
  module: {
    noParse: /\.min\.js$/,
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: PATHS.app,
        exclude: PATHS.app + '/config.api.js',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // {
      //   test: /\.css$/,
      //   include: PATHS.styles,
      //   loaders: ['style', 'css', 'postcss'],
      // },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]?[hash]'
      },
    ]
  },
  plugins: plugins,
  devtool: 'source-map'
};
