/**
 * Created by Rain Summers on 19.01.2016.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */


describe( 'DirectiveBreadcrumbs', function () {
	var element, vm, $scope, $rootScope;

	beforeEach( function () {
		module( 'confusionApp' );

		inject( function ( $compile, _$rootScope_, $httpBackend ) {
			//element = angular.element( '<breadcrumbs>{{a + b}}</breadcrumbs>' );
			element = angular.element( '<breadcrumbs>{{a + b}}</breadcrumbs>' );

			$rootScope = _$rootScope_;
			$scope     = $rootScope.$new();

			$scope.a   = 3;
			$scope.b   = 2;
			$scope.msg = 'Hello!';

			$compile( element )( $scope );
			vm = element.scope();

		} );
	} );


	it( 'can generate "breadcrumbs" correctly', function () {
		$scope.$digest();
		expect( element ).toBeDefined();
		expect( element.text() ).toBe( '5' );
		//expect( element.text() ).toBe( 'test' );
		//expect( element.data( 'val' ) ).toBe( 5 );
	} );


	it( 'View-Model', function () {
		expect( vm ).toBeDefined();
		expect( typeof vm ).toBe( 'object' );

		//expect( scope ).toBeDefined();
		//expect( typeof scope ).toBe( 'object' );

		//expect( vm.breadCrumbs ).toBeDefined();
		//expect( typeof vm.breadCrumbs ).toBe( 'object' );

	} );
} );
