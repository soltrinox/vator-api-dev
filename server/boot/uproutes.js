'use strict';

module.exports = function(server) {

// loopback-component-storage

var StorageService = require('loopback-component-storage').StorageService;

var providers = null;
  providers = require('../providers.json');


var handler = new StorageService(
  {
    provider: 'amazon',
    key: providers.amazon.key,
    keyId: providers.amazon.keyId
  });

var router = server.loopback.Router();


server.get('/uploadimage', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  var form = "<html><body><h1>Storage Service Demo</h1>" +
    "<a href='/download'>List all containers</a><p>" +
    "Upload to container con1: <p>" +
    "<form method='POST' enctype='multipart/form-data' action='/uploadimage/vatorprofilecache'>"
    + "File to upload: <input type=file name=uploadedFiles multiple=true><br>"
    + "Notes about the file: <input type=text name=note><br>"
    + "<input type=submit value=Upload></form>" +
    "</body></html>";
  res.send(form);
  res.end();
});




server.post('/uploadimage/:container', function(req, res, next) {
var options = 
{
  container: 'vatorprofilecache'  ,
  getFilename: function(fileInfo, req, res) {
        var origFilename = fileInfo.name;
        var parts = origFilename.split('.'),
            extension = parts[parts.length-1];
return '-profile.' +  extension   ;
       // return uuid.v4() + '-profile.' +  extension   ;
  }
};

 console.log('POST: '+ JSON.stringify( options) );

  handler.upload(req, res, options, function(err, result){
    if (!err) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(result);
    } else {
      res.status(500).send(err);
    }
  });
});


  server.use(router);
};
