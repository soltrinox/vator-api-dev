'use strict';
var app = angular.module('com.module.profile');

app.service('EducationService', ['$state', 'CoreService', 'User', 'Education', 'gettextCatalog',
function($state, CoreService, Education, User, gettextCatalog) {

  this.getEducations = function() {
    return Education.find();
  };

  this.getSingleEducationRecord = function(eid) {
    console.log('Edcuation.findById()' + eid);
    return Education.findById({
      id : eid
    });
  };

  this.upsertEducation = function(creds, cb) {
    Education.upsert(creds, function() {
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

  this.deleteEducation = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Education.deleteById(id, function() {
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
