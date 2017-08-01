'use strict';

angular.
	module('contactsList', ['contactsService']).
	component('contactsList', {
		templateUrl: 'components/contacts-list/contacts-list.template.html',
		controller: ['Contacts',
			function ContactsListController(Contacts) {
				var ctrl = this;

				Contacts.getPromise().then(function() {
					ctrl.contacts = Contacts.getContacts();
				});
			}
		]
	});