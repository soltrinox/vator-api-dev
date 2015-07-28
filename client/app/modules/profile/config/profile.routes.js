'use strict';
var app = angular.module('com.module.profile');

app.config(function($stateProvider) {
  $stateProvider.state('app.myprofile', {
    abstract: true,
    url: '/myprofile',
    templateUrl: 'modules/profile/views/main.html'
  }).state('app.myprofile.list', {
    url: '',
    templateUrl: 'modules/profile/views/list.html',
    controller: 'MyProfileCtrl'
  }).state('app.myprofile.add', {
    url: '/add',
    templateUrl: 'modules/profile/views/form.html',
    controller: 'MyProfileCtrl'
  }).state('app.myprofile.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/profile/views/form.html',
    controller: 'MyProfileCtrl'
  }).state('app.myprofile.view', {
    url: '/:id',
    templateUrl: 'modules/profile/views/view.html',
    controller: 'MyProfileCtrl'
  });
});
