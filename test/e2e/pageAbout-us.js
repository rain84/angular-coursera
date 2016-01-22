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


describe( 'Page "ABOUT US"', function () {
	it( 'setup', function ( done ) {
		helper.getPage.aboutUs();
		done();
	} );

	xdescribe( 'breadcrumbs', function () {
		var breadcrumbs;

		it( 'setup', function () {
			breadcrumbs = element.all( by.repeater( 'page in vm.breadCrumbs' ) );
		} );

		it( 'should exists', function () {
			expect( breadcrumbs.last().isPresent() ).toBeTruthy();
		} );

		it( 'last is "About Us"', function () {
			expect( breadcrumbs.last().getText() ).toBe( 'About Us' );
		} );
	} );

	describe( 'Leader-block. ', function () {
		it( 'leaders should exist', function () {
			var leaders = element.all( by.repeater( 'leader in vm.leaders' ) );
			expect( leaders.last().isPresent() ).toBeTruthy();
		} );

		it( 'leader-block should exist', function () {
			var leaderLocator = by.css( '[ng-if="vm.isLoaded"]' );
			expect( browser.isElementPresent( leaderLocator ) ).toBeTruthy();
		} );
	} );
} );
