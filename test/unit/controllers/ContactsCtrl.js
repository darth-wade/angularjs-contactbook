'use strict';

describe('Controller: ContactsCtrl', function () {

  // load the controller's module
  beforeEach(function() {
    module('contactBookApp');
    module(function ($provide) {
      $provide.value('contactsService', contactsServiceMock);
    });
  });

  var ContactsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    ContactsCtrl = $controller('ContactsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of contacts to the scope', function () {
    expect(scope.contacts).toBeDefined();
    expect(scope.contacts.length).toBe(3);
    expect(scope.contacts).toEqual(contactsServiceMock.getContacts());
  });

  it('should attach an ordered list of contacts to the scope', function () {
    scope.$digest();
    expect(scope.orderedContacts).toBeDefined();
    expect(scope.orderedContacts.length).toBe(3);

    expect(scope.orderedContacts[0].group).toEqual('Acquaintances');
    expect(scope.orderedContacts[1].group).toEqual('Friends');
    expect(scope.orderedContacts[2].group).toEqual('Friends');
  });

  it('should define addContact and editContact functions', function () {
    expect(scope.addContact).toBeDefined();
    expect(scope.editContact).toBeDefined();
  });
});
