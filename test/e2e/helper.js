/**
 * Created by Rain Summers on 20.01.2016.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */

(function () {
	var _       = require( 'underscore' ),

	    getPage = {
		    home        : '#/',
		    aboutUs     : '#/about-us',
		    contactUs   : '#/contact-us',
		    menu        : '#/menu',
		    dishDetails : '#/menu/0',
	    };

	_.each( getPage, function ( value, key, list ) {
		getPage[key] = function ( url ) {
			return function () {
				browser.get( url );
				//browser.refresh();
				browser.sleep( 2000 );
			};
		}( value );
	} );

	var helper = {
		getPage : getPage,
		content : {
			isEqual   : content( isEqual ),
			isGreater : content( isGreater ),
			isLess    : content( isLess ),
		},
		expect  : {
			elements : {
				isPresent      : elements( 'isPresent' ),
				isDisplayed    : elements( 'isDisplayed' ),
				isNotDisplayed : elements( 'isDisplayed', true ),
			},
		},
		select  : {
			dropdown : {
				byNumber : selectDropdownByNumber
			}
		},
		reset   : {
			checkBox : resetCheckBox
		}
	};

	module.exports = helper;


	function isEqual( a, b ) { return a === b; }
	function isGreater( a, b ) { return a > b; }
	function isLess( a, b ) { return a < b; }
	function content( comparisonFn ) {
		return function ( el1, el2 ) {
			return el1.getText().then( function ( text1 ) {
				return el2.getText().then( function ( text2 ) {
					return comparisonFn( text1.toLowerCase(), text2.toLowerCase() );
				} )
			} );
		};
	}

	function elements( isFunction, isNot ) {
		return function iterationFn( elements ) {
			_.each( elements, function ( element ) {
				if ( !element.locator && _.isObject( element ) ) {      //  if we have a "POJO" :)
					iterationFn( element );
				}
				else {
					expect( element.each
						        ? element.first()[isFunction]()           //  if we have collection, i.e. "element.all(locator)"
						        : element[isFunction]()                   //  single element
					)[isNot ? 'toBeFalsy' : 'toBeTruthy']();
				}
			} );
		};
	}
	function elementsIsPresent( elements ) {
		_.each( elements, function ( element ) {
			if ( !element.locator && _.isObject( element ) ) {      //  if we have POJO :)
				elementsIsPresent( element );
			}
			else {
				expect( element.each
					        ? element.first().isPresent()           //  if we have collection, i.e. "element.all(locator)"
					        : element.isPresent()                   //  single element
				).toBeTruthy();
			}
		} );
	}
	function elementsIsDisplayed() {}
	function elementsIsNotDisplayed() {}

	function selectDropdownByNumber( element, index, milliseconds ) {
		element.all( by.tagName( 'option' ) )
			.then( function ( options ) {
				options[index].click();
			} );
		if ( typeof milliseconds !== 'undefined' ) {
			browser.sleep( milliseconds );
		}
	}

	function resetCheckBox( element ) {
		element.getAttribute( 'checked' ).then( function ( checked ) {checked && element.click();} );
	}
}());
