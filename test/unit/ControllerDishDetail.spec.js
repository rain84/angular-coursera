/**
 * Created by Rain Summers on 17.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */


describe( 'Controller : DishDetailController', function () {

	var vm, $httpBackend, vmExchange;

	beforeEach( module( 'confusionApp' ) );


	beforeEach( inject( function ( $controller, _$httpBackend_, menuService, $stateParams, _vmExchange_ ) {

		$httpBackend = _$httpBackend_;
		$httpBackend.whenGET( 'http://localhost:3000/dishes/0' )
			.respond( {
				          "id"          : 0,
				          "name"        : "Uthapizza",
				          "image"       : "images/uthapizza.png",
				          "category"    : "mains",
				          "label"       : "Hot",
				          "price"       : 4.99,
				          "description" : "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
				          "comments"    : [{}]
			          }
			)
		;

		vmExchange = _vmExchange_;
		spyOn( vmExchange, 'registerVM' );
		$stateParams.id = 0;
		
		vm = $controller( 'DishDetailController', {
			menuService  : menuService,
			$stateParams : $stateParams,
			vmExchange   : vmExchange
		} );

	} ) );


	it( 'should be correctly inited', function () {
		expect( vm.dish ).toEqual( {} );
		expect( vm.isLoaded ).toBeFalsy();
	} );

	it( 'should correctly register current VM', function () {
		expect( vmExchange.registerVM ).toHaveBeenCalled();
		expect( vmExchange.registerVM ).toHaveBeenCalledTimes( 1 );
		expect( vmExchange.registerVM ).toHaveBeenCalledWith( vm );
	} );

	it( 'should correctly return dishes', function () {
		$httpBackend.flush();

		expect( vm.dish ).not.toEqual( {} );
		expect( typeof vm.dish.price ).toBe( 'number' );
		expect( vm.isLoaded ).toBeTruthy();
	} );

} );
