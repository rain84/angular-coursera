/**
 * Created by Rain Summers on 17.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */


describe( 'CorporateFactory', function () {
	var $resource,
	    baseUrl,
	    $httpBackend,
	    corporateFactory;

	beforeEach( function () {
		module( 'confusionApp' );

		inject( function ( $injector ) {
			$resource        = $injector.get( '$resource' );
			baseUrl          = $injector.get( 'baseUrl' );
			$httpBackend     = $injector.get( '$httpBackend' );
			corporateFactory = $injector.get( 'corporateFactory', { $resource : $resource, baseUrl : baseUrl } );
		} );

		$httpBackend.whenGET( 'http://localhost:3000/leadership' )
			.respond( [
				          {
					          "id"          : 0,
					          "name"        : "Peter Pan",
					          "image"       : "images/alberto.png",
					          "designation" : "Chief Epicurious Officer",
					          "abbr"        : "CEO",
					          "description" : "Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future. His mother's wizardy in the kitchen whipping up the tastiest dishes with whatever is available inexpensively at the supermarket, was his first inspiration to create the fusion cuisines for which The Frying Pan became well known. He brings his zeal for fusion cuisines to this restaurant, pioneering cross-cultural culinary connections."
				          },
				          {
					          "id"          : 1,
					          "name"        : "Dhanasekaran Witherspoon",
					          "image"       : "images/alberto.png",
					          "designation" : "Chief Food Officer",
					          "abbr"        : "CFO",
					          "description" : "Our CFO, Danny, as he is affectionately referred to by his colleagues, comes from a long established family tradition in farming and produce. His experiences growing up on a farm in the Australian outback gave him great appreciation for varieties of food sources. As he puts it in his own words, Everything that runs, wins, and everything that stays, pays!"
				          },
			          ] )
		;

		$httpBackend.whenGET( 'http://localhost:3000/leadership/3' )
			.respond( {
				          "id"          : 3,
				          "name"        : "Alberto Somayya",
				          "image"       : "images/alberto.png",
				          "designation" : "Executive Chef",
				          "abbr"        : "EC",
				          "description" : "Award winning three-star Michelin chef with wide International experience having worked closely with whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian fusion experiences. He says, Put together the cuisines from the two craziest cultures, and you get a winning hit! Amma Mia!"
			          } )
		;
	} );


	describe( 'should be correctly inited', function () {
		it( 'should have baseUrl', function () {
			expect( baseUrl ).toEqual( 'http://localhost:3000/' );
		} );

		it( 'corporateFactory should to be an object', function () {
			expect( typeof corporateFactory ).toEqual( 'object' );
		} );

		it( 'corporateFactory should have "getLeaders"', function () {
			expect( typeof corporateFactory.getLeaders ).toEqual( 'function' );
		} );

	} );

	describe( 'Factory "leaders" XHR', function () {
		var leaders,
		    leader;

		beforeEach( function () {
			leaders = corporateFactory.getLeaders().query();
			leader  = corporateFactory.getLeaders().get( { id : 3 } );

			$httpBackend.flush();
		} );

		it( 'leader should be as a plain object ', function () {
			expect( typeof leader === 'object' && !angular.isArray( leader ) ).toBeTruthy();
		} );

		it( 'angular should exists', function () {
			expect( angular.version.full ).toEqual( '1.4.8' );
		} );

		it( 'leader should have all required fields ', function () {
			expect( leader.id &&
			        leader.name &&
			        leader.image &&
			        leader.designation &&
			        leader.abbr &&
			        leader.description )
				.toBeTruthy();
		} );

		it( 'leader should have correct name', function () {
			expect( leader.name ).toEqual( "Alberto Somayya" );
		} );

		it( 'leader\'s length should be equal 2', function () {
			expect( leaders.length ).toEqual( 2 );
		} );

		it( 'leaders 1st name should be equal to "Peter Pan"', function () {
			expect( leaders[0].name ).toEqual( 'Peter Pan' );
		} );

		it( 'leaders(33) should throw an error"', function () {
			expect( function () {
				corporateFactory.getLeaders().get( { id : 33 } );
				$httpBackend.flush();
			} ).toThrow();
		} );
	} );
} );
