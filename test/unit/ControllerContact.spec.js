/**
 * Created by Rain Summers on 17.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */


describe( 'Controller : ContactController', function () {

	var vm, $httpBackend, $scope,
	    feedbackDefault
		;

	beforeEach( module( 'confusionApp' ) );


	beforeEach( inject( function ( $controller, _$httpBackend_, $rootScope, feedbackFactory ) {

		$httpBackend = _$httpBackend_;
		$scope       = $rootScope.$new();
		vm           = $controller( 'ContactController', {
			feedbackFactory : feedbackFactory,
			$scope          : $scope
		} );

		feedbackDefault = { myChannel : 'Tel.', firstName : '', lastName : '', agree : false, email : '', comment : '' };
	} ) );

	it( 'should have correctly inited', function () {
		expect( vm.feedback ).toEqual( feedbackDefault );
	} );

	it( '"sendFeedback" should have correctly worked', function () {

		vm.feedback         = feedbackDefault;
		$scope.feedbackForm = { $setPristine : jasmine.createSpy( '$setPristine' ) };
		spyOn( window, 'alert' );

		$httpBackend
			.whenPOST( /^http:\/\/localhost:3000\/feedback.*$/, vm.feedback )
			.respond( 201, '' )
		;

		vm.sendFeedback();
		$httpBackend.flush();

		expect( vm.feedback ).toEqual( feedbackDefault );

		expect( $scope.feedbackForm.$setPristine ).toHaveBeenCalled();
		expect( $scope.feedbackForm.$setPristine.calls.count() ).toBe( 1 );

		expect( alert ).toHaveBeenCalled();
		expect( alert.calls.count() ).toBe( 1 );
		expect( alert ).toHaveBeenCalledWith( 'Feedback successfully saved' );
	} );
} );
