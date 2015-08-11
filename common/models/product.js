'use strict';
module.exports = function(Product, Team) {

  var tempTags = {};
  var tempTeam = {};
  var isNewCompany = false;

  var subTeam = { name: 'xcvxzcvz', id: '3241234124'};

  /*  TODO:
  IF NEW COMPANY
  1] copy team members
  2] remove team from object
  3] save the object
  4] create team object
  5] add members
  6] update product with company ID pointing to team
  7] add the team id to the out bound object
  */

  /*  TODO:
  IF UPDATE COMPANY
  1] copy team object
  2] remove team from object
  3] save the object
  4] get team object
  5] update team object
  6] update product with company ID pointing to team
  7] add the team id to the out bound object
  */

  Product.observe('before save', function (ctx, next) {
    if (ctx.instance) {
      if(!ctx.instance.companyId || 0 === ctx.instance.companyId ){
        isNewCompany = true;
      }
      tempTags = ctx.instance.tags;
      tempTeam = ctx.instance.team;
      delete ctx.instance.team;
      console.log('BEFORE INSTANCE Tags 1 \n %j', tempTags);
      console.log('BEFORE INSTANCE Team 1 \n %j', tempTeam);
    } else {
      // ctx.data.updated = new Date();
      tempTags = ctx.data.tags;
      if(!ctx.data.team || 0 === ctx.data.team.length){
              console.log('NO Team');
      }else{
        console.log('BEFORE Team 2 \n %j', tempTeam);
        tempTeam = ctx.data.team;
        delete ctx.data.team;
      }

      console.log('BEFORE Tags 2 %j', tempTags);
    }

    next();
  });



  Product.observe('after save', function(ctx,  next) {
    if (ctx.instance) {
      ctx.instance.team = subTeam;
      console.log('Saved Product #%s', ctx.instance.id);
      console.log('AFTER SAVE Tags \n %j', tempTags);
      console.log('AFTER SAVE Team \n %j', tempTeam);
    } else {
      console.log('Updated Prodcuts matching %j',
        ctx.where);
        console.log('AFTER UPDATE Tags %j', tempTags);
        ctx.instance.team = subTeam;
    }
    next();
  });


  // get the whole product team etc


  Product.getEntireProduct = function(id,  cb) {
    var app = Product.app;
    var tapp = app.models.Team;
    Product.findById(id,  function(err,  product) {
      console.log('PRODUCT: %j',product);
      // links the object
      if(err) {
        console.log(err);
      } else {
        console.log('FULL PROD FOUND: \n  %j', product);
        if(!product.teams || 0 === product.teams){
          console.log(' NO TEAMS FOUND' );
          var response = {
                details: product
          };
          cb(null, response);
        }else{
          console.log( 'TEAMS FOUND : \n %j' , product.teams );
          product.teams({ productId:id },function(err, xteams){

            if(err) {
              console.log(err);
              var response = {
                    details: product
              };
              cb(null, err);
            }else{

              if(!xteams || 0 === xteams.length){
                console.log('NO PROD TEAMS %j', xteams);
                cb(null, {   details: product });
              }else{
                console.log('PROD TEAMS %j', xteams);
                var tteamId = xteams[0].id;
                app.models.Team.getPartCompany(  tteamId ,function(err, iteam){
                  if(err) {
                    console.log(err);
                  } else {
                    console.log('PART FIRST TEAMS %j', iteam);
                    var response = {
                          details: product,
                          team : iteam
                    };
                    cb(null, response);
                  }
                });
              }
            }
          });
        }
      }
    });
  };


  Product.remoteMethod('getEntireProduct', {
    accepts: [{arg: 'id', type: 'string'}],
    returns: {arg: 'company', type: 'object'},
    http: {path:'/entirecompany/:id', verb: 'get'}
  });


};
