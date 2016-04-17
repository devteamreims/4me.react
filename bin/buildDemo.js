var webpack = require('webpack');
var confBuilder = require('../config/webpack.config.demo.js');
var ProgressPlugin = require('progress-bar-webpack-plugin');
var _ = require('lodash');
var buildHtml = require('./buildHtml');
var path = require('path');

console.log('Building demo websites');

var outputPrefix = 'demo';


function buildDemo(cwpId, cb) {
  var conf = confBuilder(cwpId, outputPrefix + '/' + cwpId);

  var indexInput = path.resolve(__dirname, '..', 'src/index.html');
  var indexOutput = path.resolve(__dirname, '..', outputPrefix, `${cwpId}`, 'index.html');

  var compiler = webpack(conf);

  compiler.apply(new ProgressPlugin());

  compiler.run((err, stats) => {
    if(!cb) {
      cb = () => {};
    }

    if(err) {
      console.log('An error occured !');
      cb(err);
    }
    buildHtml(indexInput, indexOutput);
    cb(null);
  });
}


// This is awful, this needs a serious refactor
buildDemo(32, () =>
  buildDemo(33, () =>
  buildDemo(1, () =>
  buildDemo(2)
  )));



