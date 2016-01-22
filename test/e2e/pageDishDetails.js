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


describe( 'Page "DISH DETAIL". ', function () {
	it( 'setup', function ( done ) {
		helper.getPage.dishDetails();
		done();
	} );

	xdescribe( 'Breadcrumbs. ', function () {
		var breadcrumbs;

		it( 'setup', function () {
			breadcrumbs = element.all( by.repeater( 'page in vm.breadCrumbs' ) );
		} );

		it( 'should exists', function () {
			expect( breadcrumbs.last().isPresent() ).toBeTruthy();
		} );

		xit( 'last is "Menu"', function () {
			expect( breadcrumbs.last().getText() ).toBe( 'Dish details' );
		} );
	} );

	describe( 'Block "dish caption". ', function () {
		var dishBlock,
		    priceInput,
		    priceBadge;

		it( 'Setup', function () {
			dishBlock  = element( by.css( '[ng-if="vmDetail.isLoaded"]' ) );
			priceInput = element( by.model( 'vmDetail.dish.price' ) );
			priceBadge = $( '.badge' );
		} );

		it( 'Should exists', function () {
			expect( dishBlock.isPresent() ).toBeTruthy();
			expect( priceInput.isPresent() ).toBeTruthy();
			expect( priceBadge.isPresent() ).toBeTruthy();
		} );

		it( '"PriceInput" should change "badge"', function () {
			var value = 777;

			priceInput.sendKeys( webdriver.Key.chord( webdriver.Key.CONTROL, 'a' ) );
			priceInput.sendKeys( value );
			expect( priceBadge.getText() ).toBe( '$' + value + '.00' );
		} );

		it( '"PriceInput" should ignore non-numeric input', function () {
			var newValue = 'abc',
			    oldValue = {
				    input : priceInput.getText(),
				    badge : priceBadge.getText(),
			    };

			priceInput.sendKeys( newValue );
			expect( priceInput.getText() ).toBe( oldValue.input );
			expect( priceBadge.getText() ).toBe( oldValue.badge );
		} );
	} );

	describe( 'Block "dish comments". ', function () {
		var
			content         = helper.content,

			comments        = {
				list    : null,
				counter : null
			},
			newComment      = { author : null, rating : null, comment : null, },
			commentSelector = { rating : 'p:first-of-type', comment : 'p:nth-of-type(2)', footer : 'footer', },

			inputSort,
			preview         = { author : null, rating : null, comment : null, },
			buttonSubmit
			;


		it( 'Setup', function () {
			Object.defineProperty( comments, "list", {
				get : function () {return element.all( by.repeater( 'comment in vmDetail.dish.comments | orderBy:filterType' ) );}
			} );
			comments.counter = element( by.binding( 'vmDetail.dish.comments.length' ) );
			newComment       = {
				author  : element( by.model( 'vmComment.preview.author' ) ),
				rating  : element( by.model( 'vmComment.preview.rating' ) ),
				comment : element( by.model( 'vmComment.preview.comment' ) ),
			};
			inputSort        = element( by.model( 'filterType' ) );
			preview          = {
				author  : element( by.binding( 'vmComment.preview.author' ) ),
				rating  : element( by.binding( 'vmComment.preview.rating' ) ),
				comment : element( by.binding( 'vmComment.preview.comment' ) ),
			};
			buttonSubmit     = $( 'button[type="submit"]' );
		} );

		it( 'Should be presented on the page', function () {
			helper.expect.elements.isPresent( comments );
			helper.expect.elements.isPresent( newComment );
			helper.expect.elements.isPresent( preview );
			helper.expect.elements.isPresent( [inputSort, buttonSubmit] );
		} );

		it( 'Should be displayed', function () {
			helper.expect.elements.isDisplayed( comments );
			helper.expect.elements.isDisplayed( newComment );
			helper.expect.elements.isDisplayed( [inputSort, buttonSubmit] );
		} );

		it( 'Should be invisible', function () {
			helper.expect.elements.isNotDisplayed( preview );
		} );

		it( '"Comments counter" should have right value', function () {
			expect( comments.counter.getText()
				        .then( function ( counter1 ) {
					        return comments.list.count()
						        .then( function ( counter2 ) {return counter1 === ( '(' + counter2 + ')' );} );
				        } )
			).toBeTruthy();
		} );

		it( '"Sort by rating / -rating" should change order of comments', function () {

			var rating = getFirstAndLast( commentSelector.rating );

			inputSort.sendKeys( 'rating' );
			expect( content.isEqual( rating.first, rating.last ) ).toBeFalsy();
			expect( content.isLess( rating.first, rating.last ) ).toBeTruthy();


			inputSort.clear();
			inputSort.sendKeys( '-rating' );
			rating = getFirstAndLast( commentSelector.rating );

			expect( content.isEqual( rating.first, rating.last ) ).toBeFalsy();
			expect( content.isGreater( rating.first, rating.last ) ).toBeTruthy();
		} );

		it( '"Sort by comment / -comment" should change order of comments', function () {

			var comment = getFirstAndLast( commentSelector.comment );

			inputSort.clear();
			inputSort.sendKeys( 'comment' );
			expect( content.isEqual( comment.first, comment.last ) ).toBeFalsy();
			expect( content.isLess( comment.first, comment.last ) ).toBeTruthy();


			inputSort.clear();
			inputSort.sendKeys( '-comment' );
			comment = getFirstAndLast( commentSelector.comment );

			expect( content.isEqual( comment.first, comment.last ) ).toBeFalsy();
			expect( content.isGreater( comment.first, comment.last ) ).toBeTruthy();
		} );

		it( '"Sort by author / -author" should change order of comments', function () {

			var comment = getFirstAndLast( commentSelector.footer );

			inputSort.clear();
			inputSort.sendKeys( 'author' );
			expect( content.isEqual( comment.first, comment.last ) ).toBeFalsy();
			expect( content.isLess( comment.first, comment.last ) ).toBeTruthy();


			inputSort.clear();
			inputSort.sendKeys( '-author' );
			comment = getFirstAndLast( commentSelector.footer );

			expect( content.isEqual( comment.first, comment.last ) ).toBeFalsy();
			expect( content.isGreater( comment.first, comment.last ) ).toBeTruthy();
		} );

		it( '"Sort by date / -date" should change order of comments', function () {

			var comment = getFirstAndLast( commentSelector.footer );

			inputSort.clear();
			inputSort.sendKeys( 'date' );
			expect( content.isEqual( comment.first, comment.last ) ).toBeFalsy();


			inputSort.clear();
			inputSort.sendKeys( '-date' );
			comment = getFirstAndLast( commentSelector.footer );

			expect( content.isEqual( comment.first, comment.last ) ).toBeFalsy();
		} );

		it( 'Comment preview should be visible and buttonSubmit should be enable', function () {
			var value = { author : 'author', rating : 5, comment : 'comment' };

			expect( buttonSubmit.getAttribute( 'disabled' ) ).toBeTruthy();

			newComment.author.sendKeys( value.author );
			newComment.rating.sendKeys( value.rating );
			newComment.comment.sendKeys( value.comment );

			expect( buttonSubmit.getAttribute( 'disabled' ) ).toBeFalsy();

			expect( preview.author.getText() ).toBe( value.author );
			expect( preview.rating.getText() ).toBe( value.rating + ' Stars' );
			expect( preview.comment.getText() ).toBe( value.comment );

			newComment.author.clear();
			newComment.comment.clear();
			expect( buttonSubmit.getAttribute( 'disabled' ) ).toBeTruthy();
		} );

		it( 'New comment can be added by pressing "buttonSubmit" ', function () {
			var value = { author : 'author', rating : 5, comment : 'comment' };

			newComment.author.clear();
			newComment.comment.clear();

			newComment.author.sendKeys( value.author );
			newComment.rating.sendKeys( value.rating );
			newComment.comment.sendKeys( value.comment );

			inputSort.sendKeys( 'date' );

			comments.list.count().then( function ( countOld ) {
				buttonSubmit.click().then( function () {
					var lastComment = comments.list.last();

					expect( comments.list.count() ).toBe( ++countOld );
					expect( lastComment.$( commentSelector.rating ).getText()
						        .then( function ( text ) {return parseInt( text );} )
					).toBe( value.rating );
					expect( lastComment.$( commentSelector.comment ).getText() ).toBe( value.comment );
					expect( lastComment.$( commentSelector.footer ).getText()
						        .then( function ( text ) { return !!~text.indexOf( value.author ); } )
					).toBeTruthy();

				} );
			} );
		} );

		function getFirstAndLast( selector ) {
			return {
				first : comments.list.first().$( selector ),
				last  : comments.list.last().$( selector )
			};
		}
	} );

} );
