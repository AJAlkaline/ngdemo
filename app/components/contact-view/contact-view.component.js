'use strict';

angular.
	module('contactView', ['ngRoute', 'contactsService']).
	component('contactView', {
		templateUrl: 'components/contact-view/contact-view.template.html',
		controller: ['$routeParams', 'Contacts',
			function ContactViewController($routeParams, Contacts) {
				var ctrl = this;

				ctrl.edit = false;
				
				Contacts.getPromise().then(function() {
					ctrl.contact = Contacts.getContacts()[$routeParams.contactIndex];

					// Convert birthdate out of unix timestamp
					var bdate = new Date(parseInt(ctrl.contact.birthdate)*1000);
					ctrl.contact.birthdatestr = bdate.toLocaleString("en-US", 
												{year:'numeric',month:'long',day:'numeric'});
				});


				ctrl.toggleEdit = function() {
					ctrl.edit = !ctrl.edit;
					/*
					if(ctrl.edit) {
						ctrl.editcontact = angular.merge({}, ctrl.contact);
					}*/
				}

				ctrl.toggleFavorite = function() {
					ctrl.contact.favorite = !ctrl.contact.favorite;
				}

				ctrl.enter = function(event) {
					if(event.keyCode == 13) {
						ctrl.toggleEdit();
					}
				}
			}
		]
	});