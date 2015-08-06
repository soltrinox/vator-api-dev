'use strict';

module.exports = function(server) {

// loopback-component-storage

var StorageService = require('loopback-component-storage').StorageService;

var providers = null;
  providers = require('../providers.json');
var uuid = require('node-uuid');

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
    "<form method='POST' enctype='multipart/form-data' action='/uploadtest/vatorprofilecache'>"
    + "File to upload: <input type=file name=uploadedFiles multiple=true><br>"
    + "Notes about the file: <input type=text name=note><br>"
    + "<input type=submit value=Upload></form>" +
    "</body></html>";
  res.send(form);
  res.end();
});





server.post('/uploadprofile/:container/:pid', function(req, res, next) {
  var type = 'profile';
  var options = 
  {
    container: 'vatorprofilecache'  ,
    getFilename: function(fileInfo, req, res) {
        var origFilename = fileInfo.name;
        var parts = origFilename.split('.'),
            extension = parts[parts.length-1];
	//return '-'+ type +'.' +  extension   ;
        return uuid.v4() + '-'+  type +'.' +  extension   ;
    }
  };

//  console.log('POST: '+ JSON.stringify( options) );
  handler.upload(req, res, options, function(err, result){
    if (!err) {

      var responseMessage = {};
	responseMessage.result = result.files.file[0];
	responseMessage.pid = req.params.pid;
	responseMessage.type = 'profilePic';
        responseMessage.fields = req.params;

      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(responseMessage);
    } else {
      res.status(500).send(err);
    }
  });
});



server.post('/uploadcover/:container/:pid', function(req, res, next) {
  var type = 'cover';
  var options =
  {
    container: 'vatorprofilecache'  ,
    getFilename: function(fileInfo, req, res) {
        var origFilename = fileInfo.name;
        var parts = origFilename.split('.'),
            extension = parts[parts.length-1];
        //return '-'+ type +'.' +  extension   ;
        return uuid.v4() + '-'+  type +'.' +  extension   ;
    }
  };

//  console.log('POST: '+ JSON.stringify( options) );
  handler.upload(req, res, options, function(err, result){
    if (!err) {

        var responseMessage = {};
        responseMessage.result = result.files.file[0];
        responseMessage.pid = req.params.pid;
        responseMessage.type = 'coverPic';
	responseMessage.fields = req.params;

      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(responseMessage);

    } else {
      res.status(500).send(err);
    }
  });
});


server.post('/uploadmedia/:container/:pid', function(req, res, next) {
  var type = 'media';
  var options =
  {
    container: 'vatorprofilecache'  ,
    getFilename: function(fileInfo, req, res) {
        var origFilename = fileInfo.name;
        var parts = origFilename.split('.'),
            extension = parts[parts.length-1];
        //return '-'+ type +'.' +  extension   ;
        return uuid.v4() + '-'+  type +'.' +  extension   ;
    }
  };

//  console.log('POST: '+ JSON.stringify( options) );
  handler.upload(req, res, options, function(err, result){
    if (!err) {

        var responseMessage = {};
        responseMessage.result = result.files.file[0];
        responseMessage.pid = req.params.pid;
        responseMessage.type = 'media';
        responseMessage.fields = req.params;

      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(responseMessage);

    } else {
      res.status(500).send(err);
    }
  });
});



  server.use(router);
};
