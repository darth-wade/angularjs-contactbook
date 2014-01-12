'use strict';

describe('E2E: Home Page', function() {

  beforeEach(function() {
    browser().navigateTo('/');
    localStorage.clear();
  });

  it('should show a cool title ;)', function () {
    expect(element('h2').text()).toBe('Contact Book');
  });

  it('should be 0 contacts in repeater', function() {
    expect(repeater('ul.contacts > li').count()).toEqual(0);
  });

  describe('E2E: Contact Addition Modal', function() {
    beforeEach(function() {
      element('.add-contact').click();
    });

    it('should have empty fields', function() {
      expect(input('contact.name').val()).toEqual('');
      expect(input('contact.surname').val()).toEqual('');
      expect(input('contact.phone').val()).toEqual('');
      expect(input('contact.group').val()).toEqual('');
    });

    it('should open modal dialog', function() {
      expect(element('.modal-dialog').count()).toEqual(1);
    });

    it('should show correct modal title', function() {
      expect(element('.modal-header > :first-child').attr('class')).not().toContain('ng-hide');
    });

    it('should show correct button label', function() {
      expect(element('.modal-footer > .btn-primary > :first-child').attr('class')).not().toContain('ng-hide');
    });

    it('should have disabled primary button', function() {
      expect(element('.modal-footer > .btn-primary').attr('disabled')).toEqual('disabled');
    });

    it('should show required msg if name input is dirty and invalid', function() {
      input('contact.name').enter('a');
      input('contact.name').enter('');

      expect(element('.modal-body .form-group:nth-child(1)').attr('class')).toContain('has-error');
      expect(element('.modal-body .form-group:nth-child(1) .help-block').attr('class')).not().toContain('ng-hide');
    });

    it('should show required msg if phone input is dirty and invalid', function() {
      input('contact.phone').enter('a');
      input('contact.phone').enter('');

      expect(element('.modal-body .form-group:nth-child(3)').attr('class')).toContain('has-error');
      expect(element('.modal-body .form-group:nth-child(3) .help-block:nth-child(1)').attr('class')).not().toContain('ng-hide');
    });

    it('should show error msg if phone is invalid', function() {
      var invalidPhones = ['+380983', 'a0983248237', '+380 98$ 324 82 37', '+38 (098) we32-482-37'];

      for (var i = 0; i < invalidPhones.length; i++) {
        input('contact.phone').enter(invalidPhones[i]);

        expect(element('.modal-body .form-group:nth-child(3)').attr('class')).toContain('has-error');
        expect(element('.modal-body .form-group:nth-child(3) .help-block:nth-child(2)').attr('class')).not().toContain('ng-hide');
      }
    });

    it('shouldn\'t show error msg if phone is valid', function() {
      var validPhones = ['+380983248237', '0983248237', '+380 98 324 82 37', '+38 (098) 32-482-37', '+38  (098) 32-482-37'];

      for (var i = 0; i < validPhones.length; i++) {
        input('contact.phone').enter(validPhones[i]);

        expect(element('.modal-body .form-group:nth-child(3)').attr('class')).not().toContain('has-error');
        expect(element('.modal-body .form-group:nth-child(3) .help-block:nth-child(2)').attr('class')).toContain('ng-hide');
      }
    });

    it('should close window on cancel', function() {
      element('.modal-dialog .close-button').click();
      expect(element('.modal-dialog').count()).toEqual(0);
    });

    it('should add new contact', function() {
      input('contact.name').enter('Larry');
      input('contact.surname').enter('Page');
      input('contact.phone').enter('+380 (93) 782-34-28');
      input('contact.group').enter('Friends');

      expect(element('.modal-footer > .submit').attr('disabled')).not().toBeDefined();
      element('.modal-footer > .submit').click();

      // hides modal
      expect(element('.modal-dialog').count()).toEqual(0);

      // updates contacts list
      expect(repeater('ul.contacts > li').count()).toEqual(1);

      expect(element('ul.contacts > li .name > strong').text()).toEqual('Larry');
    });
  });

  describe('E2E: Contact Edition Modal', function() {
    beforeEach(function() {
      element('.add-contact').click();
      input('contact.name').enter('Larry');
      input('contact.surname').enter('Page');
      input('contact.phone').enter('+380 (93) 782-34-28');
      input('contact.group').enter('Friends');
      element('.modal-footer > .submit').click();

      element('.edit-contact').click();
    });

    it('should have filled fields', function() {
      expect(input('contact.name').val()).toEqual('Larry');
      expect(input('contact.surname').val()).toEqual('Page');
      expect(input('contact.phone').val()).toEqual('+380 (93) 782-34-28');
      expect(input('contact.group').val()).toEqual('Friends');
    });

    it('should open modal dialog', function() {
      expect(element('.modal-dialog').count()).toEqual(1);
    });

    it('should show correct modal title', function() {
      expect(element('.modal-header > :last-child').attr('class')).not().toContain('ng-hide');
    });

    it('should show correct button label', function() {
      expect(element('.modal-footer > .btn-primary > :last-child').attr('class')).not().toContain('ng-hide');
    });

    it('should have disabled primary button as unchanged', function() {
      expect(element('.modal-footer > .btn-primary').attr('disabled')).toBeDefined();
    });

    it('should close window on cancel', function() {
      element('.modal-dialog .close-button').click();
      expect(element('.modal-dialog').count()).toEqual(0);
    });

    it('should add new contact', function() {
      input('contact.name').enter('Larry2');

      expect(element('.modal-footer > .submit').attr('disabled')).not().toBeDefined();
      element('.modal-footer > .submit').click();

      // hides modal
      expect(element('.modal-dialog').count()).toEqual(0);

      // updates contacts list
      expect(repeater('ul.contacts > li').count()).toEqual(1);

      expect(element('ul.contacts > li .name > strong').text()).toEqual('Larry2');
    });
  });
});

