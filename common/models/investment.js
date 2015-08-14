'use strict';
module.exports = function(Investment) {

  Investment.observe('before save', function setDefaultUsername(ctx, next) {
    if (ctx.instance) {

      console.log(JSON.stringify(ctx.instance));
      if(!ctx.instance.created ){
        console.log('NO CREATED DATE');
        ctx.instance.created = Date.now();
      }
      ctx.instance.updated = Date.now();
    }
    next();
  });


};
