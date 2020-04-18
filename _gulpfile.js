// OK Computer,
// We need gulp to automate our workflow
var gulp = require('gulp');
// This is the syntax for gulp watch
// gulp.watch('files-to-watch', function('tasksToRun'));

// We need the gulp-sass plugin to compile Sass to css
var sass = require('gulp-sass')
// We need Browser Sync to live preview, in the browser, any changes to the code
var browserSync = require('browser-sync');


// We need to spin up a server with Browser Sync so we can preview changes to the code live in the browser
const server = browserSync.create();
function serve(done) {
	server.init({
		server: {
			baseDir: 'dev'
		}
	});
}

// We need to be able to inject new css into the browser with Browser Sync
function reload(done) {
	server.reload();
	done();
}

// We need to compile every scss file to a css file
function sassCompile() {
	return gulp.src('dev/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dev/css'))
}

// We need to watch every scss file for any change, compile them every time they are saved and reload the server and refresh the browser
// We need to watch every html file for any change and reload the server and refresh the browser every time they are saved

function watchFiles() {
	gulp.watch('dev/scss/**/*.scss', gulp.series(sassCompile, reload));
	// If we ever need a javascript file, we will need to uncomment the next line to watch every js file for any change and reload the server and refresh the browser every time they are saved
	// gulp.watch('dev/scripts/**/*.js', gulp.series(reload));
	gulp.watch('dev/**/*.html', gulp.series(reload));
}

// We need to compile sass to css each time a file is saved to update the browser live
const watch = gulp.series(sassCompile, gulp.parallel(serve, watchFiles));

gulp.task('watch', watch);