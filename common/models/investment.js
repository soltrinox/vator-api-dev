'use strict';
module.exports = function(Investment) {

  Investment.observe('before save', function setDefaultUsername(ctx, next) {
    if (ctx.instance) {
      if(!ctx.instance.created || ctx.instance.created.length === 0 || ctx.instance.created === ''){
        console.log();
        ctx.instance.created = Date.now();
      }
      if(!ctx.instance.date || ctx.instance.date.length === 0 || ctx.instance.date === ''){
        ctx.instance.date = Date.now();
      }
      if(!ctx.instance.exitdate || ctx.instance.exitdate.length === 0 || ctx.instance.exitdate === ''){
        ctx.instance.exitdate = Date.now();
      }
      ctx.instance.updated = Date.now();
    }
    next();
  });


};
