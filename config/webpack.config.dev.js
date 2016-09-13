const path = require('path');
const webpack = require('webpack');

const neatPaths = require('node-neat').includePaths;

// App files location
const PATHS = {
  app: path.resolve(__dirname, '../src'),
  entry: path.resolve(__dirname, '../src/index.js'),
  styles: path.resolve(__dirname, '../src/styles'),
  build: path.resolve(__dirname, '../build')
};

const plugins = [
// Shared code
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'js/vendor.bundle.js'}),
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.VERSION': JSON.stringify(require('../package.json').version),
    '__DEV__': JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
    '__DEMO__': JSON.stringify(false),
  }),
  new webpack.ProvidePlugin({
    Promise: "bluebird",
  }),
  new webpack.NamedModulesPlugin(),
];

const sassLoaders = [
  'sass?outputStyle=expanded&' + neatPaths
];

module.exports = {
  env : process.env.NODE_ENV,
  entry: {
    app: [
      //'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      PATHS.entry,
    ],
    vendor: ['react']
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'postcss',
          'sass',
        ],
      },
      {
        test: /\.css$/,
        //loader: ['style-loader', 'css-loader', 'postcss-loader']
        loaders: ['style', 'css', 'postcss'],
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=8192'
      }
    ],
  },
  sassLoader: {
    includePaths: neatPaths,
  },
  plugins: plugins,
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    port: 3000
  },
  devtool: 'eval'
};
