/**
 * This script copies src/index.html into build/index.html
 * This is a good example of using Node and cheerio to do a simple file transformation.
 * It might be useful when we only want to do smth. specific in the built production code.
 */

/*eslint-disable no-console */

var fs = require('fs');
var colors = require('colors');
var cheerio = require('cheerio');

function buildHtml(inputFile, outputFile) {

  console.log(`Building html, inputFile is ${inputFile}`);

  fs.readFile(inputFile, 'utf8', (err, markup) => {
    if (err) {
      return console.log(err);
    }

    const $ = cheerio.load(markup);

    // Since a separate spreadsheet is only utilized for the production build, need to dynamically add this here.
    $('head').append('<link rel="stylesheet" href="/css/app.css">');

    fs.writeFile(outputFile, $.html(), 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
    });

    console.log(`index.html written to ${outputFile}`.green);
  });
}

if (require.main === module) {
  console.log('Called directly');
  buildHtml('src/index.html', 'build/index.html');
}

module.exports = buildHtml;
