const request = require('request')
const fs = require('fs')

function downloadImageByURL(url, path) {
  console.log(url);
  console.log(path);

  var file = fs.createWriteStream(`./images/${path}.jpg`);
  request(url).pipe(file);

};

module.exports = downloadImageByURL;