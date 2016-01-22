/**
 * Created by Rain Summers on 17.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */


(function () {
	angular.module( 'underscore', [] )
		.factory( '_', function () {
			return _.noConflict();
		} )
	;
}());
