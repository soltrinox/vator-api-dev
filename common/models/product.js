'use strict';
module.exports = function(Product, Team) {

  var tempTags = {};


  Product.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.instance) {
      // ctx.instance.updated = new Date();
      tempTags = ctx.instance.tags;
      console.log('BEFORE Tags %j', tempTags);
    } else {
      // ctx.data.updated = new Date();
      tempTags = ctx.data.tags;
      console.log('BEFORE Tags %j', tempTags);
    }

    next();
  });

  Product.observe('after save', function(ctx,  next) {
    if (ctx.instance) {
      console.log('Saved Product %s#%s', ctx.Model.Product, ctx.instance.id);
      console.log('AFTER SAVE Tags %j', tempTags);
    } else {
      console.log('Updated %s matching %j',
        ctx.Model.Products,
        ctx.where);
        console.log('AFTER UPDATE Tags %j', tempTags);
    }
    next();
  });


};
