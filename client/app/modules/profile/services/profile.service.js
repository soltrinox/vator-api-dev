'use strict';
var app = angular.module('com.module.profile');

app.service('ProfileService', ['$state', 'CoreService', 'Profile', 'User',
'Education', 'Social', 'WorkHistory',  'gettextCatalog',
function($state, CoreService, Profile, User, Education, Social, WorkHistory, gettextCatalog) {

  this.getProfiles = function() {
    return Profile.find();
  };

  this.getProfile = function(id) {

     Profile.getEntireProfile({id:id});
  //   return Profile.findById({id:id});

  };

  this.upsertProfile = function(profile, cb) {
    Profile.upsert(profile, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Profile saved'), gettextCatalog.getString(
        'Your profile is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving profile '), gettextCatalog.getString(
        'This profile could not be saved: ') + err);
    });
  };

  this.deleteProfile = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Profile.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Profile deleted'), gettextCatalog.getString(
            'Your profile is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting profile'), gettextCatalog.getString(
            'Your profile is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };

// =========================================================

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

// =========================================================

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


// =========================================================

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


// =========================================================




}]);
