const request = require('request')
require('dotenv').config()

var githubRequest = function(endpoint, callback) {
  console.log(`https://api.github.com${endpoint}`)
  var requestData = {
    url: `https://api.github.com${endpoint}`,
    auth: {
    bearer: process.env.DB_BEARER,
    },
    headers: {
      'User-Agent': "request"
    }
  }
  request.get(requestData, callback)
}

module.exports = githubRequest;