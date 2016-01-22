/**
 * Created by Rain Summers on 17.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */


describe( 'VmExchangeFactory', function () {
	var vmExchange;

	beforeEach( function () {
		module( 'confusionApp' );

		inject( function ( _vmExchange_ ) {
			vmExchange = _vmExchange_;
		} );
	} );


	describe( 'should be correctly inited', function () {
		it( 'vmExchange should have "registerVM()"', function () {
			expect( typeof vmExchange.registerVM ).toEqual( 'function' );
		} );

		it( 'vmExchange should have "getVM()"', function () {
			expect( typeof vmExchange.getVM ).toEqual( 'function' );
		} );

	} );

	describe( 'methods should properly working', function () {

		it( '"vmExchange.registerVM()" should properly register new View-Model, and "vmExchange.getVM()" should properly return it', function () {
			var vm = new function Test() {};
			vmExchange.registerVM( vm );

			expect( vmExchange.getVM('Test') ).toBe(vm);
		} );
	} );
} );
