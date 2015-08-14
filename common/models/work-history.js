'use strict';
module.exports = function(WorkHistory) {

  WorkHistory.observe('before save', function setDefaultUsername(ctx, next) {
    if (ctx.instance) {
      if(!ctx.instance.Created){
        ctx.instance.Created = Date.now();
      }
      if(!ctx.instance.datestart){
        ctx.instance.datestart = Date.now();
      }
      if(!ctx.instance.dateend){
        ctx.instance.dateend = Date.now();
      }
      ctx.instance.updated = Date.now();
    }
    next();
  });

  // "Created": {
  //   "type": "date"
  // },
  // "updated" : {
  //   "type":"date"
  // },

};
