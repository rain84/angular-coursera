/**
 * Created by Rain Summers on 19.01.2016.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */

var
	webdriver = require( 'selenium-webdriver' ),
	helper    = require( './helper' );


describe( 'Page "HOME"', function () {
	it( 'setup', function ( done ) {
		helper.getPage.home();
		done();
	} );

	it( 'home browser title', function () {
		expect( browser.getTitle() ).toEqual( "Ristorante Con Fusion" );
	} );

	xdescribe( 'breadcrumbs', function () {
		var breadcrumbs;
		
		it( 'setup', function () {
			breadcrumbs = element.all( by.repeater( 'page in vm.breadCrumbs' ) );
		} );

		it( 'should exists', function () {
			expect( breadcrumbs.last().isPresent() ).toBeTruthy();
		} );

		xit( 'last is "Home"', function () {
			expect( breadcrumbs.last().getText() ).toBe( 'Home' );
		} );
	} );

	describe( 'Page blocks. ', function () {
		it( 'dish-block should exist', function () {
			var dishLocator = by.css( '[ng-if="vm.isLoaded.dish"]' )
			expect( browser.isElementPresent( dishLocator ) ).toBeTruthy();
		} );

		it( 'promotion-block should exist', function () {
			var promotion = by.css( '[ng-if="vm.isLoaded.promotion"]' )
			expect( browser.isElementPresent( promotion ) ).toBeTruthy();
		} );

		it( 'leader-block should exist', function () {
			var leaderLocator = by.css( '[ng-if="vm.isLoaded.leader"]' )
			expect( browser.isElementPresent( leaderLocator ) ).toBeTruthy();
		} );
	} );

} );
