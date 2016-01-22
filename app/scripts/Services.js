/**
 * Created by Rain Summers on 15.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 * This is a bad approach to store all controllers in one file, I know it.
 * But all this training project was written in accordance with 'Coursera-course' requirements.
 * And I am using GULP-plugin "gulp-ng-annotate". This is the reason, why I didn't define dependencies
 * in explicit way. *
 */


(function () {
	"use strict";
	
	
	angular.module( 'confusionApp' )

		.constant( 'baseUrl', 'http://localhost:3000/' )

		.service( 'menuService', menuService )

		.factory( 'corporateFactory', corporateFactory )
		.factory( 'feedbackFactory', feedbackFactory )
		.factory( 'vmExchange', vmExchange )
	;
	
	/** @ngInject */
	function menuService( $resource, baseUrl ) {
		this.getDishes    = getDishes;
		this.getPromotion = getPromotion;
		
		function getDishes() {
			return $resource( baseUrl + 'dishes/:id',
			                  { id : '@id' },
			                  { 'update' : { 'method' : 'PUT', }, }
			);
		}
		
		function getPromotion() {
			return $resource( baseUrl + 'promotions/:id',
			                  { id : '@id' },
			                  { 'update' : { 'method' : 'PUT', }, }
			);
		}
	}
	
	/** @ngInject */
	function corporateFactory( $resource, baseUrl ) {
		return {
			getLeaders : getLeaders
		};
		
		function getLeaders() {
			return $resource( baseUrl + 'leadership/:id',
			                  { id : '@id' },
			                  { 'update' : { 'method' : 'PUT', }, }
			);
		}
	}
	
	/** @ngInject */
	function feedbackFactory( $resource, baseUrl ) {
		return {
			getFeedbacks : getFeedbacks
		};
		
		function getFeedbacks() { return $resource( baseUrl + 'feedback/:id', { id : '@id' } ); }
	}
	
	/** @ngInject */
	function vmExchange() {
		var cacheVM = {},
		    service = {
			    registerVM : registerVM,
			    getVM      : getVM
		    };

		return service;


		function registerVM( vm ) {
			var controllerName      = vm.constructor.name;
			cacheVM[controllerName] = vm;
		}

		function getVM( controllerName ) { return cacheVM[controllerName]; }
	}

}());
