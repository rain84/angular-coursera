/**
 * Created by Rain Summers on 23.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */

var mockModule = require( './mocked-backend' );


xdescribe( 'Confusion App E2E Testing', function () {

	it( 'should automatically redirect to / when location hash/fragment is empty', function () {
		browser.get( '' );
		expect( browser.getLocationAbsUrl() ).toMatch( "/" );
		expect( browser.getTitle() ).toEqual( "Ristorante Con Fusion" );
	} );


	describe( 'menu 0 item', function () {

		beforeEach( function () {
			browser.get( '#/menu/0' );
		} );


		it( 'should have a name', function () {
			var name = element( by.binding( 'vmDetail.dish.name' ) );
			expect( name.getText() ).toEqual( 'Uthapizza Hot $11.00' );
		} );
		it( 'should show the first comment author as', function () {
			element( by.model( 'filterType' ) ).sendKeys( 'date' );

			//expect( element.all( by.repeater( 'comment in dish.comments' ) )
			//	        .count() ).toEqual( 6 );

			var author = element.all( by.repeater( 'comment in vmDetail.dish.comments | orderBy:filterType' ) )
				.first().element( by.binding( 'comment.author' ) );

			expect( author.getText() ).toContain( '25 Cent' );

		} );
		it( 'should add new comment to all', function () {

			var newComment = {
				author  : 'E2E',
				comment : 'comment',
			};

			expect( element( by.css( '.comment-preview' ) ).isDisplayed() ).toBe( false );

			element( by.model( 'vmComment.preview.author' ) ).sendKeys( newComment.author );
			element( by.model( 'vmComment.preview.comment' ) ).sendKeys( newComment.comment );

			expect( element( by.css( '.comment-preview' ) ).isDisplayed() ).toBe( true );
			expect( element( by.css( '.comment-preview > p:nth-of-type(2)' ) ).getText() ).toEqual( newComment.comment );
			expect( element( by.css( '.comment-preview > footer' ) ).getText() ).toEqual( newComment.author );


			//var last = element.all( by.repeater( 'comment in dish.comments' ) ).last();
			//expect( last.$( 'p:nth-of-type(2)' ).getText() ).toEqual( 'my super commit' );

			//last.$( 'footer' ).getText()
			//	.then( function ( text ) {
			//		expect( text.split( ',' )[0] ).toEqual( 'Summer Rain' );
			//	} );

		} );
	} );
} );
