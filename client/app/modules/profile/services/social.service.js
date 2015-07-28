'use strict';
var app = angular.module('com.module.profile');

app.service('SocialService', ['$state', 'CoreService', 'User', 'Social', 'gettextCatalog',
function($state, CoreService, Social, User, gettextCatalog) {

  this.getSocials = function() {
    return Social.find();
  };

  this.getSingleSocialRecord = function(sid) {
    console.log('Social.findById()' + sid);
    return Social.findById({
      id : sid
    });
  };

  this.upsertSocial = function(creds, cb) {
    Social.upsert(creds, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Credentials saved'), gettextCatalog.getString(
        'Your creds is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving credentials '), gettextCatalog.getString(
        'This creds could not be saved: ') + err);
    });
  };

  this.deleteSocial = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Social.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Creds deleted'), gettextCatalog.getString(
            'Your creds is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting creds'), gettextCatalog.getString(
            'Your creds is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };

}]);
