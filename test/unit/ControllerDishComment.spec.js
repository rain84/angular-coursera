/**
 * Created by Rain Summers on 17.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */


describe( 'Controller : DishCommentController', function () {
	
	var vm, $scope, vmExchange, dishComments = jasmine.createSpyObj( 'dishComments', ['push'] );

	beforeEach( module( 'confusionApp' ) );

	beforeEach( inject( function ( $controller, $rootScope, menuService, _vmExchange_ ) {
		$scope     = $rootScope.$new();
		vmExchange = _vmExchange_;
		spyOn( vmExchange, 'getVM' ).and.returnValue(
			{ dish : { comments : dishComments } } );


		vm = $controller( 'DishCommentController', {
			menuService : menuService,
			$scope      : $scope,
			vmExchange  : vmExchange
		} );
	} ) );
	
	
	it( 'should be correctly inited', function () {
		expect( vmExchange.getVM ).toHaveBeenCalledWith( 'DishDetailController' );
		expect( vmExchange.getVM.calls.count() ).toBe( 1 );
	} );

	it( '"isBadInput" should return values correctly', function () {
		var input = {
			$invalid : true, $dirty : true
		};

		expect( vm.isBadInput( input ) ).toBeTruthy();
	} );

	it( '"submitComment" should return values correctly', function () {
		$scope.form = { $setPristine : jasmine.createSpy( '$setPristine' ) };

		vm.submitComment();

		expect( dishComments.push ).toHaveBeenCalled();
		expect( dishComments.push ).toHaveBeenCalledWith( jasmine.objectContaining( { rating : jasmine.any( Number ), date : jasmine.any( String ) } ) );
		expect( dishComments.push.calls.count() ).toBe( 1 );

		expect( $scope.form.$setPristine ).toHaveBeenCalled();
		expect( $scope.form.$setPristine.calls.count() ).toBe( 1 );
	} );

} );
