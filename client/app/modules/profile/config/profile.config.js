'use strict';
var app = angular.module('com.module.profile');

app.run(function($rootScope, Profile, gettextCatalog) {
  $rootScope.addMenu(gettextCatalog.getString('Profile'), 'app.myprofile.list',
    'fa-rocket');
  //
  // Profile.find(function(data) {
  //   $rootScope.addDashboardBox(gettextCatalog.getString('Profiles'),
  //     'bg-green', 'ion-clipboard', data.length, 'app.profiles.list');
  // });

});
