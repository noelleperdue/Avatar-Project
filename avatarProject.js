
const request = require('request')
const fs = require('fs')
require('dotenv').config();
var githubRequest = require("./githubRequest");
var downloadImageByURL = require("./downloadImage");



function getRepoContributors(repoOwner, repoName, callback) {
  githubRequest(`/repos/${repoOwner}/${repoName}/contributors`, (err, response, body) => {
    var data = JSON.parse(body);

    if (data.message === "Bad credentials") {
      throw new Error("Your credentials are bad! Shame on you- check your token!")
    }

    else if (data.message === "Not Found") {
      throw new Error("Repository not found- possible typo with owner or name");
    } else {
      callback(data)
      data.forEach(function(contributor) {
        downloadImageByURL(contributor.avatar_url, "./" + contributor.login)
      })
    };
  });
};


if (process.argv.length !== 4) {
  throw new Error("Too many arguments!");
} else if (!process.env.DB_BEARER) {
  throw new Error("No .env file found!")
}


getRepoContributors(process.argv[2], process.argv[3], console.log);

