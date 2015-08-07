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


  Product.getEntireProduct = function(id,cb) {
    var app = Product.app;
    var tapp = Team.app;
    Product.findById(id,  function(err, tapp, product) {
      console.log('PRODUCT: %j',product);
      // links the object
      if(err) {
        console.log(err);
      } else {
        product.teams({ productId:id },function(err, tapp, teams){
          var teamz = [];
          // for(obj in teams){
          angular.forEach(teams, function(value, key) {
            console.log('TEAM: %j',value);
            var teamId = value.id;
            tapp.getEntireCompany({ id:teamId },function(err, team){
                teamz.push(team);
            });
          });

          var response = {
                details: product,
                teams : teamz
          };
          cb(null, response);

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
