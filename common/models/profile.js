'use strict';
module.exports = function(Profile, Team) {

  Profile.getEntireProfile = function(id,cb) {
    var app = Profile.app;
    Profile.findById(id,  function(err, profile) {
      // links the object
      if(err) {
        console.log(err);
      } else {
        profile.teams({ profileId:id },function(err, teams){
          profile.socials({ profileId:id },function(err, socials){
            profile.emailAddresses({ profileId:id },function(err, emailAddresses){
              profile.education({ profileId:id },function(err, education){
                profile.media({ profileId:id },function(err, media){
                  profile.roles({ profileId:id },function(err, roles){
                    profile.experience({ profileId:id },function(err, experience){
			                   profile.investments({ profileId:id },function(err, investments){

                      	// ----- compile object for response  -----
                        var response = { user : profile, companies : teams,
                        medias : media, work : experience,
                        social : socials, contact : emailAddresses,
                        edu : education, invest:investments , creds: roles };

                          // console.log( response );
                          cb(null, response);
                          //return response;
			                });
		                });
                  });
                });
              });
            });
          });
        });
      }
    });
  };


  Profile.remoteMethod('getEntireProfile', {
    accepts: [{arg: 'id', type: 'string'}],
    returns: {arg: 'profile', type: 'object'},
    http: {path:'/entireprofile/:id', verb: 'get'}
  });



};
