/**
 * Created by Rain Summers on 15.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 * This is a bad approach to store all controllers in one file, I know it.
 * But all this training project was written in accordance with 'Coursera-course' requirements.
 * And I am using GULP-plugin 'gulp-ng-annotate'. This is the reason, why I didn't define dependencies
 * in explicit way.
 */


(function () {
	'use strict';
	
	angular.module( 'confusionApp' )
		
		.controller( 'HomeController', HomeController )
		.controller( 'AboutController', AboutController )
		.controller( 'MenuController', MenuController )
		.controller( 'ContactController', ContactController )
		.controller( 'DishDetailController', DishDetailController )
		.controller( 'DishCommentController', DishCommentController )
	;
	
	/** @ngInject */
	function HomeController( menuService, corporateFactory, $timeout ) {
		var vm    = this,
		    items = [
			    { field : 'promotion', service : menuService, action : 'getPromotion', id : 0 },
			    { field : 'leader', service : corporateFactory, action : 'getLeaders', id : 3 },
			    { field : 'dish', service : menuService, action : 'getDishes', id : 0 },
		    ];
		
		vm.message  = {};
		vm.isLoaded = {};
		vm.info     = 0;


		activate();
		
		
		function activate() {
			items.forEach( function ( item ) {
				vm.message[item.field]  = 'Loading ...';
				vm.isLoaded[item.field] = false;
				
				processing( item );
			} );
		}
		
		function processing( item ) {
			vm[item.field] = item.service[item.action]().get( { id : item.id } ).$promise
				.then( function ( response ) { onHttpSuccess( item.field, response ); } )
				.catch( function ( response ) { onHttpError( item.field, item.action, response ); } )
			;
		}
		
		function onHttpSuccess( field, response ) {
			vm.isLoaded[field] = true;
			vm[field]          = response;
		}
		
		function onHttpError( field, action, response ) {
			vm.message[field] = action + ' error. ' + response.status + '. ' + response.statusText;
		}
	}
	
	/** @ngInject */
	function AboutController( corporateFactory ) {
		var vm = this;
		
		vm.message  = 'Loading ...';
		vm.isLoaded = false;
		vm.leaders  = getLeaders();
		
		
		function getLeaders() {
			return corporateFactory
				.getLeaders().query().$promise
				.then( function ( response ) {
					vm.leaders  = response;
					vm.isLoaded = true;
				} )
				.catch( function ( response ) {
					vm.message = 'corporateFactory.getLeaders error. ' + response.status + '. ' + response.statusText;
				} )
				;
		}
	}
	
	/** @ngInject */
	function MenuController( menuService ) {
		var vm = this;
		
		vm.tab         = 0;
		vm.tabs        = ['the menu', 'appetizer', 'mains', 'dessert'];
		vm.filterText  = '';
		vm.showDetails = false;
		vm.showMenu    = false;
		vm.messages    = 'Loading ...';
		
		vm.select        = select;
		vm.isSelected    = isSelected;
		vm.toggleDetails = toggleDetails;
		
		activate();
		
		
		function activate() {
			return menuService.getDishes().query().$promise
				.then( function ( response ) {
					vm.dishes   = response;
					vm.showMenu = true;
				} )
				.catch( function ( response ) { vm.messages = 'Error. ' + response.status + ' ' + response.statusText;} )
				;
		}
		
		function select( tab ) {
			vm.tab        = tab;
			vm.filterText = tab && vm.tabs[tab] || '';
		}
		
		function isSelected( tab ) { return vm.tab === tab; }
		
		function toggleDetails() { vm.showDetails = !vm.showDetails; }
	}
	
	/** @ngInject */
	function ContactController( feedbackFactory, $scope ) {
		var vm              = this,
		    feedbackDefault = { myChannel : 'Tel.', firstName : '', lastName : '', agree : false, email : '', comment : '' }
			;
		
		vm.feedback = angular.copy( feedbackDefault );
		vm.channels = [{ value : 'Tel.', label : 'Tel.' }, { value : 'Email', label : 'Email' }];

		vm.sendFeedback = sendFeedback;

		function sendFeedback() {
			var Feedbacks = feedbackFactory.getFeedbacks(),
			    feedback  = new Feedbacks( vm.feedback );

			feedback.$save( vm.feedback )
				.then( function () { alert( 'Feedback successfully saved' ); } )
				.catch( function () { alert( 'Error while feedback saving' ); } )
			;

			vm.feedback = angular.copy( feedbackDefault );
			$scope.feedbackForm.$setPristine();
		}
	}

	/** @ngInject */
	function DishDetailController( menuService, $stateParams, vmExchange ) {
		var vm = this;
		
		vm.dish       = {};
		vm.message    = 'Loading ...';
		vm.isLoaded   = false;
		vm.filterType = '';
		vm.sortBtn    = {
			onClick  : sortBtnOnClick,
			isActive : sortBtnIsActive,
			names    : [
				{ full : 'Rating', short : 'R' },
				{ full : 'Comment', short : 'C' },
				{ full : 'Author', short : 'A' },
				{ full : 'Date', short : 'D' },
			]
		};

		var sortBtn = {
			states  : [
				['rating', '-rating'],
				['comment', '-comment'],
				['author', '-author'],
				['date', '-date'],
			],
			current : [0, 0, 0, 0],
		};

		activate();


		function sortBtnOnClick( btnId ) {
			sortBtn.current[btnId] = +!sortBtn.current[btnId];

			var stateId   = sortBtn.current[btnId];
			vm.filterType = sortBtn.states[btnId][stateId];
		}

		function sortBtnIsActive( btnId ) { return ~sortBtn.states[btnId].indexOf( vm.filterType ); }

		function activate() {
			vmExchange.registerVM( vm );
			setTimeout( function () {angular.element( '[data-toggle="tooltip"]' ).tooltip();}, 500 );
			sortBtnOnClick( 3 );

			return menuService.getDishes()
				.get( { id : $stateParams.id } ).$promise
				.then( function ( response ) {
					vm.isLoaded   = true;
					vm.dish       = response;
					vm.dish.price = +vm.dish.price;
				} )
				.catch( function ( response ) {
					vm.message = 'Error on loading';
				} )
				;
		}
	}
	
	/** @ngInject */
	function DishCommentController( menuService, $scope, vmExchange ) {
		var vm       = this,
		    vmParent = vmExchange.getVM( 'DishDetailController' );
		
		vm.preview = {
			rating  : 5,
			author  : '',
			comment : ''
		};
		
		vm.isBadInput    = isBadInput;
		vm.submitComment = submitComment;


		function isBadInput( input ) { return input.$invalid && input.$dirty; }

		function submitComment() {
			vm.preview.rating = parseInt( vm.preview.rating );
			vm.preview.date   = new Date().toISOString();

			vmParent.dish.comments.push( vm.preview );
			menuService.getDishes().update( { id : vmParent.dish.id }, vmParent.dish );
			$scope.form.$setPristine();
			vm.preview = { rating : 5 };
		}
	}
	
}());
