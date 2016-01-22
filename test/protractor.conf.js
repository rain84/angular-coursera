/**
 * Created by Rain Summers on 23.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */

exports.config = {
	allScriptsTimeout : 11000,

	specs : [
		//'e2e/*.js'
		'e2e/page*.js'
	],

	capabilities : {
		'browserName' : 'chrome'
	},

	onPrepare: function() {
		global.ptor = protractor;
		//global.$ = require('./myjquery.js').$;
		browser.driver.manage().window().setSize(1200, 800);
	},

	chromeOnly : true,

	baseUrl : 'http://localhost:8010/app/#/',

	framework : 'jasmine',

	jasmineNodeOpts : {
		defaultTimeoutInterval : 30000,
		showColors: true, // Use colors in the command line report.
	}
};
