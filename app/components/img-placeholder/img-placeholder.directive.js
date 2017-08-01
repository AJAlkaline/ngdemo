'use strict';

/* If an image with the img-placeholder directive fires an error, replaces it with
   appropriately sized placeholder */
angular.module("imgPlaceholder", []).
				directive('imgPlaceholder', function() {
				return {
						link: function(scope, element, attrs) {
				  			element.bind('error', function() {
				  				var w = element.width();
				  				var h = element.height();
				  				if(w <= 20) { 
				  						w = 100; 
				  				}
				  				if(h <= 20) {
				  						h = 100;
				  				}
				  				var url = 'http://placehold.it/' + w + 'x' + h + '/cccccc/ffffff';
				  				element.prop('src', url);
				  				element.css('border', 'double 3px #ccc');
				    		})
				  	}		
				}
		});