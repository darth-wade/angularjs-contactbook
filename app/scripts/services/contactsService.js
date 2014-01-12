(function (undefined) {
  'use strict';

  var app = angular.module('contactBookApp');

  app.service('contactsService', function() {
    var _this = this;

    this.getContacts = function() {
      var contactsJson = localStorage.getItem('contacts');
      if (contactsJson != undefined) {
        return angular.fromJson(contactsJson);
      } else {
        return [];
      }
    };

    this.getContactById = function(id) {
      var contacts = _this.getContacts();

      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        if (contact.id == id) {
          return contact;
        }
      }

      return null;
    };

    this.insertContact = function(contact) {
      var contacts = _this.getContacts();
      contact.id = contacts.length;
      contacts.push(contact);

      saveContacts(contacts);

      return contact;
    };

    this.updateContact = function(id, data) {
      var contacts = _this.getContacts();

      var contact;
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id == id) {
          contact = contacts[i];
          break;
        }
      }

      if (!contact) {
        return null;
      }

      for (var key in data) {
        contact[key] = data[key];
      }

      saveContacts(contacts);

      return contact;
    };

    var saveContacts = function(contacts) {
      localStorage.setItem('contacts', angular.toJson(contacts));
    };
  });

})();