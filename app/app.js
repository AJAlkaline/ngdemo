'use strict';

angular.module('contactsDemo', [
  'ngRoute',
  'contactsService',
  'contactsList',
  'contactView',
  'imgPlaceholder'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');


  $routeProvider.
  	when('/contacts', {
  		template: '<div class="defaulttext hidden-xs"><h1>Select a contact</h1></div>',
  		controller: function() {
  			angular.element(".contactslist").removeClass("hidden-xs");
  		}
  	}).
  	when('/contacts/:contactIndex', {
  		template: '<contact-view></contact-view>',
  		controller: function() {
  			angular.element(".contactslist").addClass("hidden-xs");
  		}
  	}).
 		otherwise({redirectTo: '/contacts'});
}]);
