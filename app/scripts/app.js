(function (undefined) {
  'use strict';

  var app = angular.module('contactBookApp', ['ui.router', 'ui.bootstrap.modal', 'ui.templates']);

  app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true)
      .hashPrefix('!');

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl'
      })
      .state('gh-pages', {
        url: '/angularjs-contactbook',
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl'
      });
  });

})();