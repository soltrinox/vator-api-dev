'use strict';
var app = angular.module('com.module.profile');

app.service('WorkHistoryService', ['$state', 'CoreService',  'WorkHistory', 'User','gettextCatalog',
function($state, CoreService, WorkHistory, User, gettextCatalog) {

  this.getWorkHistorys = function() {
    return WorkHistory.find();
  };

  this.getSingleWorkHistoryRecord = function(wid) {
    console.log('WorkHistory.findById()' + wid);
    return WorkHistory.findById({
      id : wid
    });
  };

  this.upsertWorkHistory = function(workhistory, cb) {
    WorkHistory.upsert(workhistory, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'WorkHistory saved'), gettextCatalog.getString(
        'Your work history is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving WorkHistory '), gettextCatalog.getString(
        'This work history could not be saved: ') + err);
    });
  };

  this.deleteWorkHistory = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        WorkHistory.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Creds deleted'), gettextCatalog.getString(
            'Your work history is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting creds'), gettextCatalog.getString(
            'Your work history is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };


}]);
