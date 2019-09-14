const request = require('request')
const fs = require('fs')
const url = 'https://www.google.co.jp/images/nav_logo195.png';

request(
  {method: 'GET', url, encoding: null},
  (error, response, body) => {
    if(!error && response.statusCode === 200){
      fs.writeFileSync('a.png', body, 'binary');
    }
  }
);
