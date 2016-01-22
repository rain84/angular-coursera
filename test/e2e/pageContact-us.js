/**
 * Created by Rain Summers on 19.01.2016.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */

var
	webdriver = require( 'selenium-webdriver' ),
	_         = require( 'underscore' ),
	helper    = require( './helper' );


describe( 'Page "CONTACT US". ', function () {

	it( 'setup', function ( done ) {
		helper.getPage.contactUs();
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
		
		it( 'last is "Menu"', function () {
			expect( breadcrumbs.last().getText() ).toBe( 'Contact us' );
		} );
	} );
	
	describe( 'Block "FeedBack". ', function () {
		var feedbackForm    = {
			    firstName : null,
			    lastName  : null,
			    tel       : { areaCode : null, number : null, },
			    email     : null,
			    agree     : null,
			    channel   : null,
			    comment   : null,
			    btnSend   : null,
		    },
		    feedbackCurrent = { name : null, tel : null, email : null, channel : null, comment : null, },
		    helpBlock       = { firstName : null, email : null, comment : null, };
		
		it( 'Setup', function () {
			feedbackForm    = {
				firstName : element( by.model( 'vm.feedback.firstName' ) ),
				lastName  : element( by.model( 'vm.feedback.lastName' ) ),
				tel       : {
					areaCode : element( by.model( 'vm.feedback.tel.areaCode' ) ),
					number   : element( by.model( 'vm.feedback.tel.number' ) ),
				},
				email     : element( by.model( 'vm.feedback.email' ) ),
				agree     : element( by.model( 'vm.feedback.agree' ) ),
				channel   : element( by.model( 'vm.feedback.myChannel' ) ),
				comment   : element( by.model( 'vm.feedback.comment' ) ),
				btnSend   : $( 'button[type="submit"]' ),
			};
			feedbackCurrent = {
				name    : element( by.binding( 'vm.feedback.firstName' ) ),
				tel     : element( by.binding( 'vm.feedback.tel.areaCode' ) ),
				email   : element( by.binding( 'vm.feedback.email' ) ),
				channel : element( by.binding( 'vm.feedback.myChannel' ) ),
				comment : element( by.binding( 'vm.feedback.comment' ) ),
			};
			helpBlock       = {
				firstName : $( '[ng-show="feedbackForm.firstName.$error.required && feedbackForm.firstName.$dirty"]' ),
				lastName  : $( '[ng-show="feedbackForm.lastName.$error.required && feedbackForm.lastName.$dirty"]' ),
				email     : $( '[ng-show="(feedbackForm.emailid.$invalid || feedbackForm.emailid.$error.required) && feedbackForm.emailid.$dirty"]' ),
				comment   : $( '[ng-show="feedbackForm.comment.$error.required && feedbackForm.comment.$dirty"]' )
			};
		} );
		
		describe( 'On loading. ', function () {
			it( 'Should be presented on the page', function () {
				helper.expect.elements.isPresent( feedbackForm );
				helper.expect.elements.isPresent( feedbackCurrent );
				helper.expect.elements.isPresent( helpBlock );
			} );
			
			it( 'Should be displayed', function () {
				helper.expect.elements.isDisplayed( _.omit( feedbackForm, 'channel' ) );
				helper.expect.elements.isDisplayed( _.omit( feedbackCurrent, 'channel' ) );
			} );
			
			it( 'Should not be displayed', function () {
				helper.expect.elements.isNotDisplayed( [feedbackForm.channel, feedbackCurrent.channel] );
				helper.expect.elements.isNotDisplayed( helpBlock );
			} );
			
			it( '"Send Feedback" should be disabled', function () {
				expect( feedbackForm.btnSend.getAttribute( 'disabled' ) ).toBeTruthy();
			} );
			
			it( '"May we contact you?" should not be checked', function () {
				expect( feedbackForm.agree.getAttribute( 'checked' ) ).toBeFalsy();
			} );
		} );
		
		describe( 'Testing in action', function () {
			var data = {
				firstName  : 'firstName',
				lastName   : 'lastName',
				tel        : { areaCode : '111', number : '222', },
				email      : 'email@gmail.com',
				emailWrong : 'emailWrong',
				comment    : 'comment',
			};
			
			beforeEach( function () {
				feedbackForm.firstName.clear();
				feedbackForm.lastName.clear();
				feedbackForm.tel.areaCode.clear();
				feedbackForm.tel.number.clear();
				feedbackForm.email.clear();
				feedbackForm.comment.clear();

				helper.reset.checkBox( feedbackForm.agree );
			} );
			
			it( '"Send Feedback" should be enabled on firstName+lastName+comment', function () {
				expect( feedbackForm.btnSend.isEnabled() ).toBeFalsy();
				
				feedbackForm.firstName.sendKeys( data.firstName );
				feedbackForm.lastName.sendKeys( data.lastName );
				feedbackForm.comment.sendKeys( data.comment );
				
				expect( feedbackForm.btnSend.isEnabled() ).toBeTruthy();
				
			} );
			
			it( 'firstName+lastName+comment+email should make "help-blocks" visible on wrong situation and should hide it, when all is OK', function () {
				feedbackForm.firstName.sendKeys( data.firstName );
				feedbackForm.lastName.sendKeys( data.lastName );
				feedbackForm.comment.sendKeys( data.comment );
				feedbackForm.email.sendKeys( data.emailWrong );
				
				feedbackForm.firstName.clear();
				feedbackForm.lastName.clear();
				feedbackForm.comment.clear();
				
				helper.expect.elements.isDisplayed( helpBlock );
				
				feedbackForm.firstName.sendKeys( data.firstName );
				feedbackForm.lastName.sendKeys( data.lastName );
				feedbackForm.comment.sendKeys( data.comment );
				feedbackForm.email.sendKeys( data.email );
				
				helper.expect.elements.isNotDisplayed( helpBlock );
			} );
			
			it( '"Channels should be shown by "May we contact you?"-clicking ', function () {
				feedbackForm.agree.click();
				expect( feedbackForm.channel.isDisplayed() ).toBeTruthy();
			} );
			
			it( '"Channels changing should be shown on "Current Feedback"', function () {
				feedbackForm.agree.click();
				
				helper.select.dropdown.byNumber( feedbackForm.channel, 0 );
				expect( feedbackCurrent.channel.getText() ).toBe( 'Contact by: Tel.' );
				
				helper.select.dropdown.byNumber( feedbackForm.channel, 1 );
				expect( feedbackCurrent.channel.getText() ).toBe( 'Contact by: Email' );
			} );
			
			
			describe( 'When "Feedback Form" is ready. ', function () {
				beforeEach( function () {
					feedbackForm.firstName.sendKeys( data.firstName );
					feedbackForm.lastName.sendKeys( data.lastName );
					feedbackForm.tel.areaCode.sendKeys( data.tel.areaCode );
					feedbackForm.tel.number.sendKeys( data.tel.number );

					helper.reset.checkBox( feedbackForm.agree );
					feedbackForm.agree.click();

					feedbackForm.email.sendKeys( data.email );
					helper.select.dropdown.byNumber( feedbackForm.channel, 0 );
					feedbackForm.comment.sendKeys( data.comment );
				} );

				it( 'When "Feedback Form" iss filled, "Current Feedback" should be filled too. ', function () {
					expect( feedbackCurrent.name.getText() ).toBe( data.firstName + ' ' + data.lastName );
					expect( feedbackCurrent.tel.getText() ).toBe( 'Contact Tel.: (' + data.tel.areaCode + ') ' + data.tel.number );
					expect( feedbackCurrent.email.getText() ).toBe( 'Contact Email: ' + data.email );
					expect( feedbackCurrent.channel.getText() ).toBe( 'Contact by: Tel.' );
					expect( feedbackCurrent.comment.getText() ).toBe( 'Comments: ' + data.comment );
				} );

				it( 'Should be displayed "Alert", when "Send Button" will be clicked and "Feedback Form" should be empty after clicking ', function () {
					feedbackForm.btnSend.click();

					browser.wait( ptor.ExpectedConditions.alertIsPresent(), 5000 );
					var alert = browser.switchTo().alert();
					expect( alert.getText() ).toBe( 'Feedback successfully saved' );
					alert.accept();


					expect( feedbackForm.firstName.getText() ).toBe( '' );
					expect( feedbackForm.lastName.getText() ).toBe( '' );
					expect( feedbackForm.tel.areaCode.getText() ).toBe( '' );
					expect( feedbackForm.tel.number.getText() ).toBe( '' );
					expect( feedbackForm.email.getText() ).toBe( '' );
					expect( feedbackForm.comment.getText() ).toBe( '' );
					expect( feedbackForm.agree.getAttribute( 'disabled' ).then( function ( disabled ) { return !disabled} ) ).toBeTruthy();
					expect( feedbackForm.btnSend.getAttribute( 'disabled' ).then( function ( disabled ) { return disabled} ) ).toBeTruthy();
				} );
			} );

		} );
	} );
} );
