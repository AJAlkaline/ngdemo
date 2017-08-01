'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('contactsDemo', function() {

  describe('contactsList', function() {

    beforeEach(function() {
      browser.get('index.html');
    });

    it('should display a list item for each contact', function() {
      var listnames = element.all(by.repeater('contact in $ctrl.contacts').column('contact.name'));

      expect(listnames.count()).toBeGreaterThan(0);

      var getNames = function() {
        return listnames.map(function(elem) {
          return elem.getText();
        });
      }

      expect(getNames()).toEqual(jasmine.arrayContaining(['Essie Vaill']));
    });

    it('should route to `index.html#!/contacts/contactindex` when list item is clicked', function() {
      var list = element.all(by.repeater('contact in $ctrl.contacts'));
      var tlistitem = list.filter(function(elem, index) {
        return elem.element(by.binding('contact.name')).getText().then(function(text) {
          return text === 'Essie Vaill';
        });
      });

      expect(browser.getLocationAbsUrl()).toBe('/contacts');

      tlistitem.click();

      expect(browser.getLocationAbsUrl()).toBe('/contacts/0');
    });
  });

  describe('contactsView', function() {
      var editbtn;

      beforeEach(function() {
        browser.get('index.html#!/contacts/0');
        editbtn = element.all(by.css('.glyphbtn')).filter(function(elem, index) {
          return elem.element(by.css('.glyphicon-pencil')).isPresent();
        });
      });

      it('should show the correct info for the selected contact', function() {
        expect(element(by.binding('$ctrl.contact.name')).getText()).toBe('Essie Vaill');
        expect(element(by.binding('$ctrl.contact.company')).getText()).toBe('Litronic Industries');
      });

      it('should display inputs when edit toggle button is clicked', function() {
        expect(editbtn.all(by.css('.glyphicon-pencil'))).toBeDefined();

        editbtn.click();

        expect(element.all(by.tagName('input')).count()).toBeGreaterThan(0);
      });

      it('should toggle edit when enter is pressed on inputs', function() {
        editbtn.click();

        var editinput = element(by.model('$ctrl.contact.name'));

        editinput.sendKeys(protractor.Key.ENTER);

        expect(element.all(by.tagName('input')).count()).toBe(0);
      });
  });
});
