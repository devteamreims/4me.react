var webpack = require('webpack');
var confBuilder = require('../config/webpack.config.demo.js');
var ProgressPlugin = require('progress-bar-webpack-plugin');
var _ = require('lodash');
var buildHtml = require('./buildHtml');
var path = require('path');
var fs = require('fs');

console.log('Building demo websites');

var outputPrefix = 'demo';


function buildDemo(cwpId, cb) {
  var conf = confBuilder(cwpId, outputPrefix);

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
    buildHtml(indexInput, indexOutput, `/${cwpId}`);
    cb(null);
  });
}


// This is awful, this needs a serious refactor
buildDemo(32, () => 
  buildDemo(33, () =>
  buildDemo(1, () =>
  buildDemo(2)
  )));

console.log('Copying demo index redirect');

fs.readFile(path.resolve(__dirname, 'demo.index.html'), 'utf8', (err, markup) => {
  if(err) {
    return console.log(err);
  }

  fs.writeFile(path.resolve(__dirname, '..', outputPrefix, 'index.html'), markup, 'utf8', err => {
    if(err) {
      return console.log(err)
    }
    
    console.log('Wrote global index.html');
  });
});


