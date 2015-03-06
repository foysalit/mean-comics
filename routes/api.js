var config = require('../config');
var superagent = require('superagent');

module.exports = function (app) {
  
  app.get('/character', function(req, res) {

    superagent
      .get(config.api.base + '/characters')
      .query({filter: 'name:'+ req.query.name})
      .query({api_key: config.api.key})    
      .query({format: 'json'})
      .end(function(err, result) {
        //console.log(result.text);
        //assuming first one is correct
        res.json(JSON.parse(result.text).results);
      });
  });
};