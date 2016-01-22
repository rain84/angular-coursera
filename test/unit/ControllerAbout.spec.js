/**
 * Created by Rain Summers on 17.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */


describe( 'Controller : AboutController', function () {

	var vm, $httpBackend;

	beforeEach( module( 'confusionApp' ) );


	beforeEach( inject( function ( $controller, _$httpBackend_, corporateFactory ) {
		
		$httpBackend = _$httpBackend_;
		$httpBackend.whenGET( 'http://localhost:3000/leadership' )
			.respond( [
				          {
					          "id"          : 3,
					          "name"        : "Alberto Somayya",
					          "image"       : "images/manager3.jpg",
					          "designation" : "Executive Chef",
					          "abbr"        : "EC",
					          "description" : "Award winning three-star Michelin chef with wide International experience having worked closely with whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian fusion experiences. He says, Put together the cuisines from the two craziest cultures, and you get a winning hit! Amma Mia!"
				          }
			          ] )
		;

		vm = $controller( 'AboutController', {
			corporateFactory : corporateFactory
		} );
		
		$httpBackend.flush();
		
	} ) );
	
	it( 'should have correctly inited', function () {
		expect( vm.leaders ).toBeDefined();
		expect( vm.leaders.length ).toBe( 1 );
		expect( vm.leaders[0].name ).toBe( 'Alberto Somayya' );
		expect( objectSize( vm.leaders[0] ) ).toBe( 6 );
	} );

	function objectSize( response ) {
		return Object.keys( response ).length;
	}
} );
