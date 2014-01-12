'use strict';

describe('Service: contactsService', function () {

  // load the controller's module
  beforeEach(function() {
    module('contactBookApp');
  });

  // mock localStorage
  beforeEach(function () {
    var store = {};

    spyOn(localStorage, 'getItem').andCallFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').andCallFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').andCallFake(function () {
      store = {};
    });
  });

  var contactsService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    contactsService = $injector.get('contactsService');
  }));

  it('should define getContacts, getContactById, insertContact and updateContact methods', function () {
    expect(contactsService.getContacts).toBeDefined();
    expect(contactsService.getContactById).toBeDefined();
    expect(contactsService.insertContact).toBeDefined();
    expect(contactsService.updateContact).toBeDefined();
  });

  it('should reutrn empty array if there is no contacts', function () {
    expect(contactsService.getContacts()).toEqual([]);
  });

  it('should return null if there is no contact with specified id', function () {
    expect(contactsService.getContactById(234)).toBeNull();
  });

  it('should insert contact to storage', function () {
    var contact = {
      name: 'Larry',
      surname: 'Page',
      phone: '+380 (93) 782-34-28',
      group: 'Friends'
    };
    var insertedContact = contactsService.insertContact(contact);

    expect(insertedContact.id).toBeDefined();
    expect(insertedContact.name).toEqual('Larry');

    expect(contactsService.getContactById(insertedContact.id)).toEqual(insertedContact);
  });

  it('should return null if contact doesn\'t exits', function () {
    expect(contactsService.updateContact(1234, {})).toBeNull();
  });

  it('should update contact in storage', function () {
    var contact = {
      name: 'Larry',
      surname: 'Page',
      phone: '+380 (93) 782-34-28',
      group: 'Friends'
    };
    var insertedContact = contactsService.insertContact(contact);

    var data = {surname: 'Zuckerberg'};
    var updatedContact = contactsService.updateContact(insertedContact.id, data);

    expect(updatedContact.id).toEqual(insertedContact.id);
    expect(updatedContact.surname).toEqual('Zuckerberg');

    expect(contactsService.getContacts().length).toBe(1);
  });

});
