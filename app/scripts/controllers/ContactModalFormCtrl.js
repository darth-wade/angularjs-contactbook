(function (undefined) {
  'use strict';

  var app = angular.module('contactBookApp');

  app.controller('ContactModalFormCtrl', function($scope, $modalInstance, contact) {
    $scope.initialData = contact;
    $scope.contact = angular.copy(contact);
    // returns true if we in edition mode
    $scope.edition = (Object.keys(contact).length !== 0);

    // checks if form was changed
    $scope.isUnchanged = function(contact) {
      return angular.equals(contact, $scope.initialData);
    };

    $scope.saveContact = function () {
      $modalInstance.close($scope.contact);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

})();