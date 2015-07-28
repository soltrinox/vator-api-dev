'use strict';
angular.module('com.module.about')
  .run(function($rootScope, gettextCatalog) {

    $rootScope.addMenu(gettextCatalog.getString('About'), 'app.about',
      'fa-calendar');

    // $rootScope.addDashboardBox(gettextCatalog.getString('About'), 'bg-maroon',
    //   'ion-information', 0, 'app.about.index');

  });
