'use strict';

describe('Controller: ContactModalFormCtrl', function () {

  // load the controller's module
  beforeEach(function() {
    module('contactBookApp');
    module(function($provide) {
      $provide.value('$modalInstance', jasmine.createSpy());
    });
  });

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('Addition', function () {
    var ContactModalFormCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();

      ContactModalFormCtrl = $controller('ContactModalFormCtrl', {
        $scope: scope,
        contact: {}
      });
    }));

    it('should attach initial data to the scope', function () {
      expect(scope.initialData).toBeDefined();
      expect(scope.initialData).toEqual({});
    });

    it('should copy initial data and attach it to the scope', function () {
      expect(scope.contact).toBeDefined();
      expect(scope.contact).not.toBe(scope.initialData);
      expect(scope.contact).toEqual({});
    });

    it('should set edition mode to false', function () {
      expect(scope.edition).toBeDefined();
      expect(scope.edition).toBe(false);
    });

    it('should return true if data was unchanged', function () {
      expect(scope.isUnchanged).toBeDefined();

      expect(scope.isUnchanged({})).toBe(true);
      expect(scope.isUnchanged({name: 'Mark'})).toBe(false);
    });

    it('should define saveContact and cancel functions', function () {
      expect(scope.saveContact).toBeDefined();
      expect(scope.cancel).toBeDefined();
    });

  });

  describe('Edition', function () {
    var ContactModalFormCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();

      ContactModalFormCtrl = $controller('ContactModalFormCtrl', {
        $scope: scope,
        contact: {
          id: 1,
          name: 'Larry',
          surname: 'Page',
          phone: '+380 (93) 782-34-28',
          group: 'Friends'
        }
      });
    }));

    it('should copy initial data and attach it to the scope', function () {
      expect(scope.contact).toBeDefined();
      expect(scope.contact).not.toBe(scope.initialData);
      expect(scope.contact.name).toEqual('Larry');
    });

    it('should set edition mode to true', function () {
      expect(scope.edition).toBeDefined();
      expect(scope.edition).toBe(true);
    });

    it('should return true if data was unchanged', function () {
      expect(scope.isUnchanged).toBeDefined();

      expect(scope.isUnchanged({
        id: 1,
        name: 'Larry',
        surname: 'Page',
        phone: '+380 (93) 782-34-28',
        group: 'Friends'
      })).toBe(true);

      expect(scope.isUnchanged({
        id: 1,
        name: 'Larry222',
        surname: 'Page',
        phone: '+380 (93) 782-34-28',
        group: 'Friends'
      })).toBe(false);
    });
  });

});
