/**
 * Created by Rain Summers on 14.01.2016.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */

(function () {
	'use strict';
	angular
		.module( 'confusionApp' )
		.directive( 'breadcrumbs', breadcrumbs );

	breadcrumbs.$inject = [];

	/* @ngInject */
	function breadcrumbs() {
		var directive = {
			bindToController : true,
			controller       : BreadcrumbController,
			controllerAs     : 'vm',
			templateUrl      : './partials/breadcrumbs.html',
			link             : link,
			restrict         : 'EA',
		};
		return directive;

		function link( scope, element, attrs ) { }
	}
	
	BreadcrumbController.$inject = ['$state', '$scope'];
	
	/* @ngInject */
	function BreadcrumbController( $state, $scope ) {
		var vm = this;

		vm.breadCrumbs = [];

		activate();

		function getBreadcrumbs( currentState ) {
			var breadCrumbs = currentState.name
				.split( '.' )
				.reduce( function ( states, item, idx ) {
					var state = states.length && (states[idx - 1].state + '.' + item)
					            || item,
					    name  = $state.get( state )['alias'] || ''
						;

					states.push( {
						             state : state,
						             name  : name,
					             } );

					return states;
				}, [] )
				;

			breadCrumbs[breadCrumbs.length - 1].isActive = true;

			return breadCrumbs;
		}

		function activate() {
			$scope.$root.$on( '$stateChangeSuccess',
			                  function ( event, toState, toParams, fromState, fromParams ) {
				                  vm.breadCrumbs = getBreadcrumbs( toState );
			                  } )
			;
		}
	}
})();
