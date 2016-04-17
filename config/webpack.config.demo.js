const prodConfig = require('./webpack.config.prod.js');
const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');


module.exports = (cwpId, pathPrefix) => {
  console.log(`Building webpack conf for cwpId : ${cwpId}`);

  // Change output path
  const e = _.merge({}, prodConfig, {
    output: {
      path: path.resolve(__dirname, '..', pathPrefix),
    },
  });

  // Add define plugin with global var set to cwpId
  e.plugins = [
    ...e.plugins,
    new webpack.DefinePlugin({
      'process.env.CWP_ID': JSON.stringify(cwpId),
    }),
  ];

  return e;
};
