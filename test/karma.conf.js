/**
 * Created by Rain Summers on 17.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */

	// Karma configuration

module.exports = function ( config ) {
	config.set( {

		            // base path that will be used to resolve all patterns (eg. files, exclude)
		            basePath : '.',

		            // frameworks to use
		            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter

		            frameworks : ['jasmine'],

		            // list of files / patterns to load in the browser
		            files : [
			            '../bower_components/angular/angular.js',
			            '../bower_components/angular-ui-router/release/angular-ui-router.js',
			            '../bower_components/angular-resource/angular-resource.js',
			            '../bower_components/angular-cookies/angular-cookies.min.js',
			            '../bower_components/angular-mocks/angular-mocks.js',
			            '../bower_components/angular-animate/angular-animate.min.js',
			            '../app/scripts/*.js',
			            '../test/unit/**/*.spec.js'
		            ],


		            // list of files to exclude
		            exclude : [
			            'test/protractor.conf.js', 'test/e2e/*.js'
		            ],


		            // preprocess matching files before serving them to the browser
		            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		            preprocessors : {
			            //'app/scripts/*/*.js' : ['coverage'],
		            },

		            // test results reporter to use
		            // possible values: 'dots', 'progress'
		            // available reporters:  https://npmjs.org/browse/keyword/karma-reporter
		            reporters : ['progress'],
		            //reporters : ['progress', 'coverage', 'growl'],

		            // web server port
		            port : 9876,

		            // enable / disable colors in the output (reporters and logs)
		            colors : true,

		            // level of logging
		            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		            logLevel : config.LOG_INFO,

		            // enable / disable watching file and executing tests whenever any file changes
		            autoWatch : true,


		            // start these browsers
		            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		            browsers : ['PhantomJS'],
		            //browsers : ['Chrome', 'PhantomJS', 'PhantomJS_custom'],

		            plugins : [
			            'karma-chrome-launcher',
			            'karma-jasmine',
			            'karma-junit-reporter',
			            'karma-phantomjs-launcher',
			            //'karma-coverage',
		            ],


		            junitReporter : {
			            outputFile : 'test_out/unit.xml',
			            suite      : 'unit'
		            },

		            // you can define custom flags
		            //customLaunchers : {
			         //   'PhantomJS_custom' : {
				     //       base    : 'PhantomJS',
				     //       options : {
					 //           windowName : 'my-window',
					 //           settings   : {
						//            webSecurityEnabled : false
					 //           },
				     //       },
				     //       flags   : ['--load-images=true'],
				     //       debug   : true
			         //   }
		            //},

		            phantomjsLauncher : {
			            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
			            exitOnResourceError : true
		            },

		            // Continuous Integration mode
		            // if true, Karma captures browsers, runs the tests and exits
		            singleRun : false,

		            // Concurrency level
		            // how many browser should be started simultaneous
		            concurrency : Infinity

	            } )
};
