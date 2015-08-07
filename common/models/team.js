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

                // ----- compile object for response  -----
                var response = {
                      details: team,
                      members : profiles,
        				      company : products
                      // files: media
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




};
