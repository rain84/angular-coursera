/**
 * Created by Rain Summers on 17.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */


describe( 'FeedbackFactory', function () {
	var $resource,
	    baseUrl,
	    $httpBackend,
	    feedbackFactory;
	
	beforeEach( function () {
		module( 'confusionApp' );
		
		inject( function ( $injector ) {
			$resource       = $injector.get( '$resource' );
			baseUrl         = $injector.get( 'baseUrl' );
			$httpBackend    = $injector.get( '$httpBackend' );
			feedbackFactory = $injector.get( 'menuService', { $resource : $resource, baseUrl : baseUrl } );
		} );
		
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
			          } )
		;
		
		$httpBackend.whenGET( 'http://localhost:3000/promotions/0' )
			.respond( {
				          "id"          : 0,
				          "name"        : "Weekend Grand Buffet",
				          "image"       : "images/buffet.png",
				          "label"       : "New",
				          "price"       : "19.99",
				          "description" : "Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person "
			          } )
		;
	} );
	
	
	describe( 'should be correctly inited', function () {
		it( 'should have baseUrl', function () {
			expect( baseUrl ).toEqual( 'http://localhost:3000/' );
		} );
		
		it( 'feedbackFactory should be an object', function () {
			expect( typeof feedbackFactory ).toEqual( 'object' );
		} );
		
		it( 'feedbackFactory should have next methods : "getPromotion" && "getDishes"', function () {
			expect( typeof feedbackFactory.getPromotion ).toEqual( 'function' );
			expect( typeof feedbackFactory.getDishes ).toEqual( 'function' );
		} );
	} );
	
	describe( '"FeedbackFactory.getPromotion()" XHR', function () {
		var promotion;
		
		it( 'all necessary fields should exist', function () {
			promotion = feedbackFactory.getPromotion().get( { id : 0 } );
			$httpBackend.flush();
			
			expect( promotion.id !== undefined
			        && promotion.name
			        && promotion.image
			        && promotion.label
			        && promotion.price
			        && promotion.description
			).toBeTruthy();
		} );
		
		it( 'getPromotion(999) should throw an error"', function () {
			expect( function () {
				feedbackFactory.getPromotion().get( { id : 999 } );
				$httpBackend.flush();
			} ).toThrow();
		} );
	} );
	
	describe( '"FeedbackFactory.getDishes()" XHR', function () {
		var dish;
		
		it( 'all necessary fields should exist', function () {
			dish = feedbackFactory.getDishes().get( { id : 0 } );
			$httpBackend.flush();
			
			expect( dish.id !== undefined
			        && dish.name
			        && dish.image
			        && dish.category
			        && dish.label
			        && dish.price
			        && dish.description
			        && dish.comments
			).toBeTruthy();
		} );
		
		it( 'getDishes(999) should throw an error"', function () {
			expect( function () {
				feedbackFactory.getDishes().get( { id : 999 } );
				$httpBackend.flush();
			} ).toThrow();
		} );
	} );
	
} );
