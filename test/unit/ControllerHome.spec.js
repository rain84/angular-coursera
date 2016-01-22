/**
 * Created by Rain Summers on 17.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */

	//var backendExpect = require( 'backendExpect' );

describe( 'Controller : HomeController', function () {

	var vm, $httpBackend;

	beforeEach( module( 'confusionApp' ) );

	beforeEach( inject( function ( $controller, _$httpBackend_, menuService, corporateFactory, $timeout ) {
		
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
		$httpBackend.whenGET( 'http://localhost:3000/promotions/0' )
			.respond( {
				          "id"          : 0,
				          "name"        : "Weekend Grand Buffet",
				          "image"       : "images/buffet.png",
				          "label"       : "New",
				          "price"       : "19.99",
				          "description" : "Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person "
			          }
			)
		;

		$httpBackend.whenGET( 'http://localhost:3000/leadership/3' )
			.respond( {
				          "id"          : 3,
				          "name"        : "Alberto Somayya",
				          "image"       : "images/manager3.jpg",
				          "designation" : "Executive Chef",
				          "abbr"        : "EC",
				          "description" : "Award winning three-star Michelin chef with wide International experience having worked closely with whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian fusion experiences. He says, Put together the cuisines from the two craziest cultures, and you get a winning hit! Amma Mia!"
			          }
			)
		;

		vm = $controller( 'HomeController', {
			menuService      : menuService,
			corporateFactory : corporateFactory,
			$timeout         : $timeout
		} );
		
		$httpBackend.flush();
		
	} ) );
	
	it( 'should be correctly inited', function () {
		expect( Object.keys( vm.isLoaded ).length ).toBe( 3 );
		expect( vm.isLoaded.promotion ).toBeDefined();
		expect( vm.isLoaded.promotion ).toBeTruthy();

		expect( Object.keys( vm.message ).length ).toBe( 3 );
		expect( vm.message.promotion ).toBe( 'Loading ...' );
	} );

	it( 'should have "promotion" correctly activated', function () {
		expect( vm.promotion ).toBeDefined();
		expect( vm.promotion.name ).toBe( 'Weekend Grand Buffet' );
		expect( objectSize( vm.promotion ) ).toBe( 6 );
	} );

	it( 'should have "leader" correctly activated', function () {
		expect( vm.leader ).toBeDefined();
		expect( vm.leader.name ).toBe( 'Alberto Somayya' );
		expect( objectSize( vm.leader ) ).toBe( 6 );
	} );

	it( 'should have "dish" correctly activated', function () {
		expect( vm.dish ).toBeDefined();
		expect( vm.dish.name ).toBe( 'Uthapizza' );
		expect( objectSize( vm.dish ) ).toBe( 8 );

	} );

	function objectSize( response ) {
		return Object.keys( response ).length - 2;
	}
} );
