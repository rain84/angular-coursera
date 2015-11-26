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
		html   : 'app/*.html',
		js     : 'app/scripts/**/*.js',
		styles : 'app/styles/*.sass',
		img    : 'app/img/**/*.*',
		fonts  : 'app/fonts/**/*.*'
	},
	src   : {
		html   : 'app/*.html',
		js     : 'app/js/**/*.js',
		styles : 'app/styles/*.sass',
	},
	dst   : {
		html   : 'app/',
		js     : 'app/js/',
		styles : 'app/styles',
	},
};

var config = {
	server    : "",
	//files     : ["app/**/*.html", "app/**/*.js", "app/**/*.css"],
	tunnel    : true,
	host      : 'localhost',
	port      : 8010,
	logPrefix : "Rain Summers",
	canReload : false,
};


gulp
	.task( 'watch', ['build'], watch )
	.task( 'build', ['build:html', 'build:js', 'build:styles',], function () {
		//browserSync.reload();
		config.canReload = true;
	} )
	.task( 'build:html', function () {
		config.canReload && browserSync.reload();
	} )
	.task( 'build:js', function () {
		config.canReload && browserSync.reload();
	} )
	.task( 'build:styles', function () {
		gulp.src( path.src.styles )
			.pipe( sass() )
			.pipe( gulp.dest( path.dst.styles ) )
			.pipe( callback( function () {
				config.canReload && browserSync.reload();
			} ) )
		;
	} )
;


function watch() {
	browserSync( config );

	gulp.watch( path.watch.html, ['build:html'] );
	gulp.watch( path.watch.js, ['build:js'] );
	gulp.watch( path.watch.styles, ['build:styles'] );
}
