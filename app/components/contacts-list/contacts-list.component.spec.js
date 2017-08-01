'use strict';

describe('contactsList', function() {

	var $httpBackend;
	var Contacts;
	var $componentController;
	var jsonData = [
			{name: 'Person A'},
			{name: 'Person B'},
			{name: 'Person C'}
		];
	var contactsData = [];
	var ctrl;

	beforeEach(function() {
		jasmine.addCustomEqualityTester(angular.equals);
	});

	beforeEach(module('contactsList'));

	beforeEach(inject(function(
			_$q_, 
			_Contacts_,
			_$componentController_, 
			_$httpBackend_
		) {
		$httpBackend = _$httpBackend_;
		$componentController = _$componentController_;

		$httpBackend.expectGET('json/Contacts_v2.json').respond(jsonData);
		
		Contacts = _Contacts_;

		spyOn(Contacts, 'getPromise').and.callThrough();
		spyOn(Contacts, 'getContacts').and.callThrough();

		ctrl = $componentController('contactsList', {'Contacts':Contacts}, null);
	}));

	it('should ask for promise, and store returned array from Contacts', function() { 

		expect(Contacts.getPromise).toHaveBeenCalled();
		expect(ctrl.contacts).toBeUndefined();

		$httpBackend.flush();

		expect(Contacts.getContacts).toHaveBeenCalled();
		expect(ctrl.contacts).toEqual(jsonData);
	});

});