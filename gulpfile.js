const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');


// 清空 dist
function cleanFiles () {
	return src('dist', {read: false, allowEmpty: true})
		.pipe(clean());
}

// 压缩 css
function minifyCss() {
	return src('src/css/*.css')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'));
}

function concatCss () {
	return src('src/*.css', {
			ignore: [
				'src/css/bootstrap.min.css',
				'src/css/swiper.min.css',
				'src/css/animate.min.css',
			]
		})
		.pipe(concat('index.min.js'))
		.pipe(dest('dist/css'));
}

// 压缩 html
function minifyHtml () {
	return src('src/*.html')
    .pipe(htmlmin({ 
    	collapseWhitespace: true,
    	removeEmptyAttributes: true,
    	removeScriptTypeAttributes: true,
    	removeStyleLinkTypeAttributes: true,
    	minifyCSS: true,
    	minifyJS: true 
    }))
    .pipe(dest('dist'));
}

exports.build = series(cleanFiles, minifyCss, concatCss);
exports.default = concatCss;