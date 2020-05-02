// OK Computer,
// We need gulp to automate our workflow
var gulp = require('gulp');

// We need the gulp-sass plugin to compile Sass to css
var sass = require('gulp-sass');
// We need to tell gulp-sass which compiler to use
sass.compiler = require('node-sass');
// We need Browser Sync to live preview, in the browser, any changes to the code
var browserSync = require('browser-sync');
// We need the gulp-useref plugin to concatenate multiple scripts in one single file
var useref = require('gulp-useref');
// We need the gulp-uglify plugin to minify our files
var uglify = require('gulp-uglify');
// We need the gulp-if plugin to build conditional statements
var gulpIf = require('gulp-if');
// We need the gulp-imagemin plugin to optimize our images
var imagemin = require('gulp-imagemin');
// We need the gulp-cache plugin to avoid repeating tasks over files that did not change
var cache = require('gulp-cache');
// We need del to clean unnecessary files from our deployment folder
var del = require('del');
// We need autoprefixer to automatically support vendor prefixes
var autoprefixer = require('autoprefixer');
// We need the gulp-sourcemaps plugin to generate source maps of our scss files and link them to css files
var sourcemaps = require('gulp-sourcemaps');
// We need the gulp-postcss plugin in order to use multiple css psot processors
var postcss = require('gulp-postcss');

// We need to declare our paths so we can easily change them in one single place in the future
var rootPath = {
	dev: 'dev',
	deploy: 'deploy'
};

var paths = {
	root: {
		dev: 'dev',
		deploy: 'deploy'
	},
	markup: {
		dev: rootPath.dev + '/**/*.html',
		deploy: rootPath.deploy
	},
	styles: {
		dev: rootPath.dev + '/scss/**/*.scss',
		compiled: rootPath.dev + '/css',
		deploy: rootPath.deploy
	},
	scripts: {
		dev: rootPath.dev + '/js/**/*.js',
		deploy: rootPath.deploy
	},
	fonts: {
		dev: rootPath.dev + '/fonts/**/*',
		deploy: rootPath.deploy + '/fonts'
	},
	images: {
		dev: rootPath.dev + '/images/**/*',
		deploy: rootPath.deploy + '/images'
	}
};

// We need to spin up a server with Browser Sync so we can preview changes to the code live in the browser
const server = browserSync.create();
function serve(done) {
	server.init({
		server: {
			baseDir: rootPath.dev
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
	return gulp.src(paths.styles.dev)
		.pipe(sass())
		.pipe(gulp.dest(paths.styles.compiled))
}

// We need to autoprefix, compile Sass, minify our Css files and add source maaps
function buildCss() {
    var plugins = [
        autoprefixer({browsers: ['last 2 versions']})
    ];
	return gulp.src(paths.styles.dev)
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(postcss(plugins))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.styles.compiled))
}

// We need to concatenate all of our scripts/stylesheets files in the dev folder and copy them to a different folder for deployment
function buildScripts() {
	return gulp.src(paths.markup.dev)
		// We need to minify our js files
		.pipe(gulpIf('*.js', uglify()))
		// We need to concatenate our js and css files
		.pipe(useref())
		.pipe(gulp.dest(paths.markup.deploy))
}

// We need to optimize our images and copy them to their deployment folder
function images() {
	return gulp.src(paths.images.dev + '.+(png|jpg|gif|svg)')
		.pipe(cache(
		imagemin({
		// We need to specify any options we want to use when optimizing our images
		interlaced: true,
		optimizationLevel: 3
		})))
	.pipe(gulp.dest(paths.images.deploy))
}

// We need to watch every scss file for any change, compile them every time they are saved and reload the server and refresh the browser
function watchFiles() {
	// We need to watch sass files
	gulp.watch(paths.styles.dev, gulp.series(sassCompile, reload));
	// We need to watch js files
	gulp.watch(paths.scripts.dev, gulp.series(reload));
	// We need to watch html files
	gulp.watch(paths.markup.dev, gulp.series(reload));
}

// We need to copy the fonts folder contents from dev to deployment
function fonts() {
	return gulp.src(paths.fonts.dev)
	.pipe(gulp.dest(paths.fonts.deploy))
}

// We need to delete the deployment folder to get rid of unused files
function cleanDep(done) {
	del.sync(rootPath.deploy);
	done();
}

// We need a task to clear the cache
function clear(done) {
	return cache.clearAll(done);
}

exports.sassCompile = sassCompile;
exports.serve = serve;
exports.reload = reload;
exports.watchFiles = watchFiles;
exports.buildCss = buildCss;
exports.buildScripts = buildScripts;
exports.images = images;
exports.fonts = fonts;

exports.clear = clear;
exports.cleanDep = cleanDep;

// We need a watch task that compiles all scss to css, spin up a server and use BrowserSync to reload browser each time any file is saved
const watch = gulp.series(sassCompile, gulp.parallel(serve, watchFiles));
gulp.task('watch', watch);

// We need a build task to clean the deployment folder, compile sass to css, concatenate and minify js/css files, optimize images and copy everything (including fonts) to the deployment folder
var build = gulp.series(cleanDep, buildCss, gulp.parallel(buildScripts, images, fonts));
gulp.task('build', build);

