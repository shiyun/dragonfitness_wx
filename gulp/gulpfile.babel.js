var gulp = require('gulp'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	livereload = require('gulp-livereload'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	minifycss = require('gulp-minify-css'),
	del = require('del'),
	notify = require('gulp-notify'),
	exec = require('child_process').exec;

/*
import browserify from 'browserify';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import es2015 from 'babel-preset-es2015';
import sourcemaps from 'gulp-sourcemaps';
*/

//js检查,合并，压缩公共js文件
gulp.task('libs', function(){
	//合并压缩第三方库
	gulp.src([
			'../node_modules/jquery/dist/jquery.min.js',
			'../node_modules/lodash/lodash.min.js'	
//			'../src/js/setFontSize.js'
		])
		.pipe(concat('libs.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('../public/js'));
});

//js检查,合并，压缩公共js文件
gulp.task('util', function(){
	gulp.src(['../src/util/*.js', '../src/comp/ui/class/ui.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('util.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('../public/js'));
});

const comps = [	
	{name:'login',dependencies:[]},
	{name:'coupon',dependencies:[]},
	{name:'order',dependencies:[]},
	{name:'personHome',dependencies:[]},
	{name:'setting',dependencies:[]},
	{name:'stores',dependencies:[]},
	{name:'map',dependencies:[]}
];

//组件js合并压缩(comp)
gulp.task('comps', function(){
	for(var i=0;i<comps.length;i++){
		if(!comps[i].dependencies) comps[i].dependencies=[];
		//comps[i].dependencies.push("../src/comp/ui/class/ui.js");
		comps[i].dependencies.push("../src/comp/" + comps[i].name + "/class/*.js");
		comps[i].dependencies.push("../src/comp/" + comps[i].name + "/main.js");
		gulp.src(comps[i].dependencies)	
			/*
			.pipe(babel({
			  presets: ["es2015"]
			}))
			.pipe(through2.obj(function(file, enc, next) {
				browserify(file.path)
				// .transform(reactify)
				  .bundle(function(err, res) {
				  err && console.log(err.stack);
				  file.contents = res;
				  next(null, file);
				});
			}))*/
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(concat(comps[i].name + '.js'))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('../public/js'));		
	}
});

gulp.task('test', ()=>{
	return  browserify({entries: '../src/js/test2.js', debug: false})
			.transform("babelify", { presets: [es2015] })
			.bundle()
			.pipe(source('test.js'))
			.pipe(buffer())
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			//.pipe(sourcemaps.init())
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			//.pipe(sourcemaps.write('./maps'))
			.pipe(gulp.dest('../public/js'));
});

//less编译
gulp.task('less', function(){
	gulp.src(['../src/less/style.less'])
		.pipe(less())
		.pipe(autoprefixer({browsers: ['last 2 versions', 'ff 18', 'safari 5','ie 8','ie 9', 'opera 12.1', 'ios 6', 'android 4']}))
		.pipe(concat('style.css'))
		.pipe(minifycss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('../public/css'))
});

gulp.task('cleanCash', function (done) {
	del.sync(['../public/images/'], {force: true});
    return cache.clearAll(done);  
});  

//图片压缩
gulp.task('images', function() {
	return gulp.src(['../src/images/**/*.*'])
		.pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
		//.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true,svgoPlugins: [{removeViewBox: false}],use: [pngquant()]})))
		.pipe(gulp.dest('../public/images'))
});

//压缩前删除原来文件夹里的内容
gulp.task('clean', function(cb){
	//del(['../public/css/*.css', '../public/js/*.js'], cb);
	del.sync(['../public/css/', '../public/js/'], {force: true});
});

gulp.task('live', function(){
	livereload.listen();
	gulp.watch(['../src/**']).on('change', livereload.changed);
});

// 默认任务
gulp.task('default', function(){
	//gulp.run('clean', 'libs', 'util', 'comps', 'ie8Html5', 'copy', 'less', 'images', 'live');
	gulp.run('clean', 'libs', 'util', 'less', 'comps', 'live', 'images');

	gulp.watch('../src/less/*.*', ['less']);
	gulp.watch('../src/images/**/*.*', ['images']);
	gulp.watch('../src/comp/**/main.js', ['comps']);
	gulp.watch('../src/util/*.*', ['util']);
});

// bower
gulp.task('bower', function(){
	var exec = require('child_process').exec;
	var cmdStr = 'cd .. && cd .bower && bower install';
	exec(cmdStr, function(err,stdout,stderr){
		console.log(stdout);
	})
});

//初始化项目
gulp.task('all', function(){
	var exec = require('child_process').exec;
	var cmdStr = 'cd .. && cd .bower && bower install';
	exec(cmdStr, function(err,stdout,stderr){
		console.log(stdout);
		gulp.run('libs', 'util', 'less', 'comps', 'less', 'images');
	})
});

//yuidoc . -o ../.doc
//生成js文档
gulp.task('doc', function(){
	var exec = require('child_process').exec;
	var cmdStr = 'cd .. && cd src && yuidoc . -o ../.doc';
	exec(cmdStr, function(err,stdout,stderr){
		console.log(stdout);
	})
});