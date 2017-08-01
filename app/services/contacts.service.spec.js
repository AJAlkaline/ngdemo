'use strict';

describe('Contacts', function() {

	var $httpBackend;
	var Contacts;
	var contactsData = [
		{name: 'Person A'},
		{name: 'Person B'},
		{name: 'Person C'}
	];

	beforeEach(function() {
		jasmine.addCustomEqualityTester(angular.equals);
	});

	beforeEach(module('contactsService'));

	beforeEach(inject(function(_$httpBackend_, _Contacts_) {
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('json/Contacts_v2.json').respond(contactsData);

		Contacts = _Contacts_;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	})

	it('should return the contacts from "json/Contacts_v2.json"', function() {
		var contacts = Contacts.getContacts();

		expect(contacts).toEqual([]);

		$httpBackend.flush();
		expect(contacts).toEqual(contactsData);
	});
});