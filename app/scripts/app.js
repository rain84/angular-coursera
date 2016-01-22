(function () {
	'use strict';

	angular.module( 'confusionApp', ['ui.router', 'ngResource', 'underscore', 'ngCookies', 'ngAnimate'] )

		.config( function ( $stateProvider, $urlRouterProvider ) {

			$stateProvider

				.state( 'app', {
					alias : 'Home',
					url   : '/',
					views : {
						header  : { templateUrl : 'views/header.html' },
						content : { templateUrl : 'views/home.html', },
						footer  : { templateUrl : 'views/footer.html' },
					},
				} )

				.state( 'app.about-us', {
					alias : 'About Us',
					url   : 'about-us',
					views : {
						'content@' : { templateUrl : 'views/about-us.html' },
					}
				} )

				.state( 'app.contact-us', {
					alias : 'Contact us',
					url   : 'contact-us',
					views : {
						'content@' : { templateUrl : 'views/contact-us.html' },
					}
				} )

				.state( 'app.menu', {
					alias : 'Menu',
					url   : 'menu',
					views : {
						'content@' : { templateUrl : 'views/menu.html', },
					}
				} )

				.state( 'app.menu.dish-details', {
					alias : 'Dish details',
					url   : '/:id',
					views : {
						'content@' : { templateUrl : 'views/dish-details.html', },
					}
				} )
			;

			$urlRouterProvider.otherwise( '/' );
		} )

		.run( function ( $rootScope, $timeout ) {

			(function breadcrumbInit() {
				var off = $rootScope
					.$on( '$stateChangeSuccess', function () {
						var args = [].slice.call( arguments );
						args.shift();
						args.unshift( '$stateChangeSuccess' );

						off();
						$timeout( function () {
							$rootScope.$broadcast.apply( $rootScope, args );
						}, 0 );
					} );
			})();
		} )
	;
}());
