'use strict';
module.exports = function(Team) {


  Team.getEntireCompany = function(id,cb) {
    var app = Team.app;
    Team.findById(id,  function(err, team) {
      // links the object
      if(err) {
        console.log(err);
      } else {
        team.members({ teamId:id },function(err, profiles){
          team.projects({ teamId:id },function(err, products){
                // Team.media({ teamId:id },function(err, media){
                var media  = { files : [ 'http://bit.ly/1IuNOek', 'http://bit.ly/1M9PmiD' ]};
                // ----- compile object for response  -----
                var response = {
                      details: team,
                      members : profiles,
        				      projects : products,
                      media: media
        			  };
                cb(null, response);
            // });
          });
        });
      }
    });
  };


  Team.remoteMethod('getEntireCompany', {
    accepts: [{arg: 'id', type: 'string'}],
    returns: {arg: 'company', type: 'object'},
    http: {path:'/entirecompany/:id', verb: 'get'}
  });

  Team.getPartCompany = function(id,cb) {
    var app = Team.app;
    Team.findById(id,  function(err, team) {
      // links the object
      if(err) {
        console.log(err);
      } else {
        team.members({ teamId:id },function(err, profiles){
                var media  = { files : [ 'http://bit.ly/1IuNOek', 'http://bit.ly/1M9PmiD' ]};
                // ----- compile object for response  -----
                var response = {
                      details: team,
                      members : profiles,
                      media: media
                };
                cb(null, response);
        });
      }
    });
  };


  Team.remoteMethod('getPartCompany', {
    accepts: [{arg: 'id', type: 'string'}],
    returns: {arg: 'team', type: 'object'},
    http: {path:'/partcompany/:id', verb: 'get'}
  });




};
