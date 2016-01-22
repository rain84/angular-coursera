/**
 * Created by Rain Summers on 23.11.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */
"use strict";

var gulp            = require( 'gulp' ),
    minifycss       = require( 'gulp-minify-css' ),
    uncss           = require( 'gulp-uncss' ),
    jshint          = require( 'gulp-jshint' ),
    autoprefixer    = require( "gulp-autoprefixer" ),
    plumberNotifier = require( 'gulp-plumber-notifier' ),
    browserslist    = require( "browserslist" ),
    rigger          = require( 'gulp-rigger' ),
    stylish         = require( 'jshint-stylish' ),
    sass            = require( 'gulp-sass' ),
    uglify          = require( 'gulp-uglify' ),
    usemin          = require( 'gulp-usemin' ),
    minifyHtml      = require( 'gulp-minify-html' ),
    imagemin        = require( 'gulp-imagemin' ),
    ngAnnotate      = require( 'gulp-ng-annotate' ),
    rename          = require( 'gulp-rename' ),
    concat          = require( 'gulp-concat' ),
    cache           = require( 'gulp-cache' ),
    changed         = require( 'gulp-changed' ),
    callback        = require( 'gulp-callback' ),
    duration        = require( 'gulp-duration' ),
    rev             = require( 'gulp-rev' ),
    async           = require( 'async-tiny' ),
    browserSync     = require( 'browser-sync' ),
    _               = require( 'underscore' ),
    del             = require( 'del' );


var path     = {
	    watch : {
		    dir  : 'app',
		    html : 'app/*/*.html',
		    js   : 'app/scripts/**/*.js',
		    css  : 'app/styles/*.css',
		    sass : 'app/styles/*.+(sass|scss)',
	    },
	    src   : {
		    index    : 'app/index.html',
		    views    : 'app/views/*.html',
		    partials : 'app/partials/*.html',
		    styles   : 'app/styles',
		    js       : 'app/scripts/app.js',
		    images   : 'app/images/**/*.+(jpeg|jpg|png)',
		    fonts    : [
			    'bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*',
			    'bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*'
		    ],
	    },
	    build : {
		    dir      : 'dist',
		    views    : 'dist/views',
		    partials : 'dist/partials',
		    styles   : 'dist/styles',
		    index    : 'dist/index.html',
		    js       : 'dist/js',
		    sass     : 'mystyles',
		    images   : 'dist/images',
		    fonts    : 'dist/fonts',
	    },
    },

    bsConfig = {
	    build     : {
		    server    : {
			    baseDir : path.build.dir,
			    index   : 'index.html'
		    },
		    tunnel    : true,
		    host      : 'localhost',
		    port      : 8011,
		    logPrefix : "Rain Summers",
	    },
	    watch     : {
		    server    : {
			    baseDir : '',
			    index   : ''
		    },
		    tunnel    : false,
		    host      : 'localhost',
		    port      : 8010,
		    logPrefix : "Rain Summers",
	    },
	    canReload : false
    }
	;


gulp
	.task( 'build', function () {
		async( [
			       taskClear,
			       taskCopy,
			       //taskRiggerHTML,
			       taskRiggerJS,
			       //taskJsHint,
			       taskSass,
			       taskUsemin,
			       //taskUncss,     ????
			       taskImagemin,
		       ] )
			.then( function () {
				browserSync.init( bsConfig.build );
				console.log( 'PROJECT BUILDED' );
			} )
		;
	} )
	.task( 'watch', function () {
		async( [
			       //taskRiggerHTML,
			       //taskRiggerJS,
			       //taskJsHint,
			       taskSass,
			       //taskCopyFonts,
		       ] )
			.then( function () {

				browserSync.init( bsConfig.watch );
				bsConfig.canReload = true;

				//gulp.watch( path.watch.appJS, taskRiggerJS );
				gulp.watch( path.watch.sass, taskSass );
				gulp.watch( [path.watch.html, path.watch.css, path.watch.js], browserSync.reload );

				console.log( 'WATCHING INITED' );
			} )
		;
	} )
;

function watchHandler( action ) { async( taskRiggerHTML ).async( action ); }

function taskJsHint( defer ) {
	console.log( 'taskJsHint' );

	return gulp.src( path.watch.js )
		.pipe( plumberNotifier() )
		.pipe( changed( path.watch.js ) )
		.pipe( jshint() )
		.pipe( jshint.reporter( stylish ) )
		.pipe( callback( function () {
			browserReload();
			resolve( defer );
		} ) )
		;
}

function taskRiggerJS( defer ) {
	console.log( 'taskRiggerJS' );

	return gulp.src( path.src.js )
		.pipe( rigger() )
		.pipe( gulp.dest( path.watch.dir ) )
		.pipe( callback( function () {
			del( path.watch.dir + '/app.js' );
			resolve( defer );
		} ) )
		;
}

function taskRiggerHTML( defer ) {
	console.log( 'taskRiggerHTML' );

	return gulp.src( path.watch.html )
		.pipe( rigger() )
		.pipe( gulp.dest( path.watch.dir ) )
		.pipe( callback( function () {
			resolve( defer );
		} ) );
}

function taskSass( defer ) {
	console.log( 'taskSass' );

	gulp.src( path.watch.sass )
		.pipe( plumberNotifier() )

		.pipe( sass() )
		.pipe( autoprefixer( { browsers : browserslist( '> 5%, last 2 version' ) } ) )
		//.pipe( concat( config.sassOutput ) )
		/*
		 .pipe( rename( function ( filePath ) {
		 filePath.basename = path.build.sass;
		 } ) )
		 */

		//.pipe( sourcemaps.init() )
		//.pipe( uncss( { 'html' : [path.html] } ) )
		//.pipe( cssmin() )
		//.pipe( sourcemaps.write() )

		.pipe( gulp.dest( path.src.styles ) )

		.pipe( callback( function () {
			browserReload();
			resolve( defer );
		} ) )
	;
}

function taskUncss( defer ) {
	console.log( 'taskUncss' );

	return gulp.src( path.build.styles + '/*.css' )
		.pipe( uncss( { html : [path.build.index, path.build.views + '/*/*.html'] } ) )
		.pipe( gulp.dest( path.build.styles ) )
		.pipe( callback( function () { resolve( defer ); } ) )
		;
}

function taskUsemin( defer ) {
	setTimeout( function () {
		console.log( 'taskUsemin' );

		gulp.src( path.src.index )
			.pipe( usemin( {
				               html : [minifyHtml],
				               css  : [minifycss, rev],
				               js   : [ngAnnotate, uglify, rev],
			               } ) )
			.pipe( gulp.dest( path.build.dir ) )
			.pipe( callback( function () { resolve( defer ); } ) );
	}, 500 );
}

function taskImagemin( defer ) {
	console.log( 'taskImagemin' );

	return gulp.src( path.src.images )
		.pipe( imagemin( { optimizationLevel : 3, progressive : true, interlaced : true } ) )
		.pipe( gulp.dest( path.build.images ) )
		.pipe( callback( function () {
			resolve( defer );
		} ) )
		;
}

function taskCopy( defer ) {
	console.log( 'taskCopy' );

	taskCopyViews();
	taskCopyFonts();
	taskCopyPartials();

	defer.resolve();
}

function taskCopyFonts() {
	console.log( 'taskCopyFonts' );

	_.each( path.src.fonts, function ( src ) {
		gulp.src( src )
			.pipe( gulp.dest( path.build.fonts ) );
	} );
}

function taskCopyViews() {
	console.log( 'taskCopyViews' );

	gulp.src( path.src.views )
		//.pipe( usemin( { html : [minifyHtml] } ) )
		.pipe( gulp.dest( path.build.views ) )
	;
}

function taskCopyPartials() {
	console.log( 'taskCopyPartials' );

	gulp.src( path.src.partials )
		.pipe( gulp.dest( path.build.partials ) )
	;
}

function taskClear( defer ) {
	console.log( 'taskClear' );

	del( path.build.dir );
	setTimeout( defer.resolve, 500 );
}

function resolve( defer ) {
	defer && defer.resolve && defer.resolve();
}

function browserReload() {
	if ( bsConfig.canReload ) {
		console.log( 'browserReload' );
		browserSync.reload();
	}
}
