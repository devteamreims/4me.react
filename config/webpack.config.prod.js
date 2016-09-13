const path = require('path');
const webpack = require('webpack');

const neatPaths = require('node-neat').includePaths;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// App files location
const PATHS = {
  app: path.resolve(__dirname, '../src'),
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
  /*
  new CopyWebpackPlugin([
    {
      from: PATHS.images,
      to: 'images'
    }
  ]),
  */
  // Shared code
  //new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'js/vendor.bundle.js'}),
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.VERSION': JSON.stringify(require('../package.json').version),
    '__DEV__': JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
    '__DEMO__': JSON.stringify(false),
  }),
  new webpack.ProvidePlugin({
    Promise: "bluebird",
  }),
  /*new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    exclude: ['src/api.endpoints.js'],
  }),
  */

  // This plugin moves all the CSS into a separate stylesheet
];

module.exports = {
  entry: {
    app: PATHS.entry,
    vendor: ['react'],
    api: PATHS.app + '/api.endpoints.js',
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  stats: {
    colors: true
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx', '.scss']
  },
  target: 'web',
  module: {
    noParse: /\.min\.js$/,
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass'],
      },
      {
        test: /\.css$/,
        include: PATHS.styles,
        loaders: ['style', 'css', 'postcss'],
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]?[hash]'
      },
    ]
  },
  sassLoader: {
    includePaths: neatPaths,
  },
  plugins: plugins,
  devtool: 'source-map'
};
