/**
 * Created by Rain Summers on 23.11.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */

var
	gulp        = require( 'gulp' ),
	sass = require( "gulp-sass" ),
	browserSync = require( "browser-sync" ),
	callback    = require( "gulp-callback" )
	;


var path = {
	watch : { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
		html  : 'app/*.html',
		js    : 'app/scripts/**/*.js',
		style : 'app/styles/*.sass',
		img   : 'app/img/**/*.*',
		fonts : 'app/fonts/**/*.*'
	},
	src   : {
		html  : 'app/*.html',
		js    : 'app/js/**/*.js',
		style : 'app/styles/*.sass',
	},
	dst   : {
		html  : 'app/',
		js    : 'app/js/',
		style : 'app/styles',
	},
};

var config = {
	server    : "",
	//files     : ["app/**/*.html", "app/**/*.js", "app/**/*.css"],
	tunnel    : true,
	host      : 'localhost',
	port      : 8010,
	logPrefix : "Rain Summers",
};


gulp.task( 'watch', watch );


function watch() {
	browserSync( config );

	gulp.watch( path.watch.html, browserSync.reload );
	gulp.watch( path.watch.js, browserSync.reload );

	gulp.watch( path.watch.style, function () {
		gulp.src( path.src.style )
			.pipe( sass() )
			.pipe( gulp.dest( path.dst.style ) )
			.pipe( callback( function () {
				browserSync.reload( );
			} ) )
		;
	} );
}
