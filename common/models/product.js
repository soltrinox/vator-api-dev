'use strict';
module.exports = function(Product, Team) {

  var tempTags = {};


  Product.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.instance) {
      ctx.instance.updated = new Date();
      tempTags = ctx.instance.tags;
    } else {
      ctx.data.updated = new Date();
      tempTags = ctx.data.tags;
    }
    console.log('BEFORE Tags %j', tempTags);
    next();
  });

  Product.observe('after save', function(ctx, next) {
    if (ctx.instance) {
      console.log('Saved Product %s#%s', ctx.Model.modelName, ctx.instance.id);
      console.log('AFTER SAVE Tags %j', tempTags);
    } else {
      console.log('Updated %s matching %j',
        ctx.Model.pluralModelName,
        ctx.where);
        console.log('AFTER UPDATE Tags %j', tempTags);
    }
    next();
  });

  // Product.beforeSave = function(next, modelInstance) {
  //   console.log('Product.beforeSave: '+ modelInstance );
  //   if(!modelInstance.Team){
  //
  //   }else if(0 === modelInstance.Team){
  //     delete modelInstance.Team;
  //   }else{
  //     tempTeam = modelInstance.Team;
  //     delete modelInstance.Team;
  //   }
  //
  //   next();
  // };
  //
  // Product.afterCreate = function(next) {
  //
  //   next();
  // }
  //
  // Product.beforeCreate = function(next, modelInstance) {
  //   console.log('Product.beforeCreate: '+modelInstance);
  //   if(!modelInstance.Team){
  //
  //   }else if(0 === modelInstance.Team){
  //     delete modelInstance.Team;
  //   }else{
  //     tempTeam = modelInstance.Team;
  //     delete modelInstance.Team;
  //   }
  //
  //   next();
  // };



/*
  Team.getEntireCompany = function(id,cb) {
    var app = Profile.app;
    Team.findById(id,  function(err, team) {
      // links the object
      if(err) {
        console.log(err)
      } else {
        team.members({ teamId:id },function(err, profiles){
          team.projects({ teamId:id },function(err, products){
                profile.media({ teamId:id },function(err, media){

                        // ----- compile object for response  -----
                        var response = { members : profiles,
                                company : products,
                                files: media
                         };

                          // console.log( response );
                          cb(null, response);
                          //return response;
            });
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
*/



};
