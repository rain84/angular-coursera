/**
 * Created by Rain Summers on 17.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */


describe( 'Controller : MenuController', function () {

	var vm, $httpBackend, menuService;

	beforeEach( module( 'confusionApp' ) );


	beforeEach( inject( function ( $controller, _$httpBackend_, $rootScope, menuService ) {

		$httpBackend = _$httpBackend_;
		$httpBackend.whenGET( 'http://localhost:3000/dishes' )
			.respond( [
				          {
					          "id"          : 0,
					          "name"        : "Uthapizza",
					          "image"       : "images/uthapizza.png",
					          "category"    : "mains",
					          "label"       : "Hot",
					          "price"       : 4.99,
					          "description" : "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
					          "comments"    : [{}]
				          },
				          {
					          "id"          : 1,
					          "name"        : "Zucchipakoda",
					          "image"       : "images/zucchipakoda.png",
					          "category"    : "appetizer",
					          "label"       : "New",
					          "price"       : "1.99",
					          "description" : "Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce",
					          "comments"    : [{}]
				          },
			          ] )
		;

		vm = $controller( 'MenuController', {
			menuService : menuService
		} );

		$httpBackend.flush();

	} ) );
	
	it( 'should be correctly inited', function () {
		expect( vm.showDetails ).toBeFalsy();
		expect( vm.messages ).toBe( 'Loading ...' );
		expect( vm.tabs ).toEqual( ['the menu', 'appetizer', 'mains', 'dessert'] );
	} );

	it( 'should create "dishes" with 2 dishes fetched from xhr', function () {
		expect( vm.dishes ).toBeDefined();
		expect( vm.dishes.length ).toBe( 2 );
	} );
	
	it( 'should have the correct data order in the dishes', function () {
		expect( vm.dishes[0].name ).toBe( "Uthapizza" );
		expect( vm.dishes[1].label ).toBe( "New" );
		
	} );
	
	it( 'should change the tab selected based on tab clicked', function () {
		
		expect( vm.tab ).toEqual( 0 );
		
		vm.select( 0 );
		expect( vm.tab ).toEqual( 0 );
		expect( vm.filterText ).toEqual( '' );

		vm.select( 3 );
		expect( vm.tab ).toEqual( 3 );
		expect( vm.filterText ).toEqual( 'dessert' );
	} );
} );
