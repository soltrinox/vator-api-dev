'use strict';
module.exports = function(Product, Team) {

  var tempTags = {};
  var tempTeam = {};


  Product.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.instance) {
      if(!ctx.instance.companyId || 0 === ctx.instance.companyId ){

      }
      tempTags = ctx.instance.tags;
      console.log('BEFORE INSTANCE Tags %j', tempTags);
    } else {
      // ctx.data.updated = new Date();
      tempTags = ctx.data.tags;
      console.log('BEFORE Tags %j', tempTags);
    }

    next();
  });

  Product.observe('after save', function(ctx,  next) {
    if (ctx.instance) {
      console.log('Saved Product #%s', ctx.instance.id);
      console.log('AFTER SAVE Tags %j', tempTags);
    } else {
      console.log('Updated Prodcuts matching %j',
        ctx.where);
        console.log('AFTER UPDATE Tags %j', tempTags);
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
        product.teams({ productId:id },function(err, xteams){
          console.log('PROD TEAMS %j', xteams[0]);
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
        });
      }
    });
  };


  Product.remoteMethod('getEntireProduct', {
    accepts: [{arg: 'id', type: 'string'}],
    returns: {arg: 'company', type: 'object'},
    http: {path:'/entirecompany/:id', verb: 'get'}
  });


};
