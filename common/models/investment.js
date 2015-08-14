'use strict';
module.exports = function(Investment) {

  Investment.observe('before save', function setDefaultUsername(ctx, next) {
    if (ctx.instance) {

      console.log(JSON.stringify(ctx.instance));


      if(!ctx.instance.created || ctx.instance.created.length === 0 || ctx.instance.created === ''){
        console.log('NO CREATED DATE');
        ctx.instance.created = Date.now();
      }
      if(!ctx.instance.date || ctx.instance.date.length === 0 || ctx.instance.date === ''){
        console.log('NO START DATE');
        ctx.instance.date = Date.now();
      }
      if(!ctx.instance.exitdate || ctx.instance.exitdate.length === 0 || ctx.instance.exitdate === ''){
        console.log('NO EXIT DATE');
        ctx.instance.exitdate = Date.now();
      }
      ctx.instance.created = Date.now();
      ctx.instance.date = Date.now();
      ctx.instance.exitdate = Date.now();
      ctx.instance.updated = Date.now();
    }
    next();
  });


};
