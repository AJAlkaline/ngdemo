'use strict';

/**

*/

angular.
	module('contactsService', []).
	factory('Contacts', ['$http', 
		function($http) {
			var fact = this;

			if(!angular.isDefined(fact.data)) {
				fact.data = [];

				fact.promise = $http.get('json/Contacts_v2.json').then(function(response) {
						Array.prototype.push.apply(fact.data, response.data);
				});
			}

			fact.getPromise = function() {
				return fact.promise;
			}

			fact.getContacts = function() {
				return fact.data;
			}

			return {
				getPromise: fact.getPromise,
				getContacts: fact.getContacts
			}
		}
	]);