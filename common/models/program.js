'use strict';
module.exports = function(Program) {

  Program.observe('before save', function setDefaultUsername(ctx, next) {
    if (ctx.instance) {
      if(!ctx.instance.Created){
        ctx.instance.Created = Date.now();
      }
      ctx.instance.updated = Date.now();
    }
    next();
  });

};
