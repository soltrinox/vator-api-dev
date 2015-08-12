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
  var form = "<html><head><META http-equiv='refresh' content='1;URL=http://dev.vator.co'></head>"+
    "<body><h1>VATOR IMAGE SERVICE</h1>" +
    "<h3><a href=''>RETURN</a></h3>" +
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
      responseMessage.name = result.files.file[0].name;

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
      responseMessage.name = result.files.file[0].name;

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
        responseMessage.name = result.files.file[0].name;

      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(responseMessage);

    } else {
      res.status(500).send(err);
    }
  });
});



  server.use(router);
};
