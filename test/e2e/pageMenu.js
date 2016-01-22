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


describe( 'Page "MENU"', function () {
	it( 'setup', function ( done ) {
		helper.getPage.menu();
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

		xit( 'last is "Menu"', function () {
			expect( breadcrumbs.last().getText() ).toBe( 'Menu' );
		} );
	} );

	describe( 'menu-block', function () {
		var menuBlock,
		    menuTabs,
		    menuDishes,
		    toggleButton,
		    toggleText;

		it( 'setup', function () {
			menuBlock    = element( by.css( '[ng-if="vm.showMenu"]' ) );
			menuTabs     = element.all( by.repeater( 'tab in vm.tabs' ) );
			menuDishes   = element.all( by.repeater( 'dish in vm.dishes | filter:vm.filterText' ) );
			toggleButton = $( '[ng-click="vm.toggleDetails()"]' );
			toggleText   = $( '[ng-show="vm.showDetails"]' );
		} );

		it( 'should exists', function () {
			expect( menuBlock.isPresent() ).toBeTruthy();
			expect( menuTabs.last().isPresent() ).toBeTruthy();
			expect( menuDishes.last().isPresent() ).toBeTruthy();
			expect( toggleButton.isPresent() ).toBeTruthy();
		} );

		it( '"THE MENU" tab should be active by default', function () {
			expect( getActiveText() ).toBe( 'THE MENU' );
		} );

		it( '"THE MENU" tab should be active by default', function () {
			var activeText = 'APPETIZER';

			element( by.linkText( activeText ) ).click();
			expect( getActiveText() ).toBe( activeText );
		} );

		it( '"TOGGLE"-button should change own caption on click', function () {
			toggleButton.click();
			expect( toggleButton.getText() ).toBe( 'Hide Details' );

			toggleButton.click();
			expect( toggleButton.getText() ).toBe( 'Show Details' );

		} );

		it( '"TOGGLE"-button should show description text on click', function () {
			toggleButton.click();
			expect( toggleText.getText() ).not.toBe( '' );

			toggleButton.click();
			expect( toggleText.getText() ).toBe( '' );

		} );


		function getActiveText() {return menuBlock.$( 'li.active' ).getText();}
	} );

} );
