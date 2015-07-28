'use strict';
angular.module('com.module.products')
  .run(function($rootScope, Product, Category, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Company'),
      'app.products.list', 'fa-bank');

    Product.find(function(data) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Company'),
        'bg-yellow', 'ion-ios7-cart-outline', data.length,
        'app.products.list');
    });

    Category.find(function(data) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Groups'),
        'bg-aqua', 'ion-ios7-pricetag-outline', data.length,
        'app.products.list');
    });

  });
