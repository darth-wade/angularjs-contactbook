(function (undefined) {
  'use strict';

  var app = angular.module('contactBookApp');

  app.controller('ContactsCtrl', function ($scope, $modal, contactsService, orderByFilter) {
    $scope.$watchCollection('contacts', function() {
      // sorts contact list by 'group', needed for grouping implementation
      $scope.orderedContacts = orderByFilter($scope.contacts, 'group');
    });

    $scope.contacts = contactsService.getContacts();

    $scope.addContact = function () {
      var modalInstance = openContactForm({});

      modalInstance.result.then(function(contact) {
        contact = contactsService.insertContact(contact);
        $scope.contacts.push(contact);
      });
    };

    $scope.editContact = function (initialData) {
      var modalInstance = openContactForm(initialData);

      modalInstance.result.then(function(contact) {
        contact = contactsService.updateContact(initialData.id, contact);

        // replaces previous contact instance from contacts list to updated one
        for (var i = 0, len = $scope.contacts.length; i < len; i++) {
          if (contact.id == $scope.contacts[i].id) {
            $scope.contacts[i] = contact;
            break;
          }
        }
      });
    };


    // opens add/edit contact modal form
    var openContactForm = function(initialData) {
      var modalInstance = $modal.open({
        templateUrl: 'views/partials/modals/contact-modal-form.html',
        controller: 'ContactModalFormCtrl',
        resolve: {
          contact: function () {
            return initialData;
          }
        }
      });

      return modalInstance;
    };
  });

})();