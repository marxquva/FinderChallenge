var gulp = require("gulp");
var concat = require('gulp-concat');
var pug = require("gulp-pug");
var stylus = require("gulp-stylus");


/* ------------- Tareas de aplicacion -------------*/
gulp.task('libraries-js', function() {
    gulp.src([
            'bower_components/angular/angular.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js'
        ])
        .pipe(concat('libraries.min.js'))
		//.pipe(jsmin())
        .pipe(gulp.dest('./public/libraries/js'));
});

gulp.task('libraries-css', function() {
    gulp.src([
            'bower_components/pure/pure-min.css',
			'bower_components/pure/grids-responsive-min.css',
        ])
        .pipe(concat('libraries.min.css'))
        .pipe(gulp.dest('./public/libraries/css'));
});

gulp.task('styles', function () {
	return gulp.src('src/styles/*.styl')
    	.pipe(stylus({compress: true}))
    	.pipe(gulp.dest('./public/styles'));
});

gulp.task('scripts', function() {
    gulp.src([
			'src/scripts/global.js',
            'src/scripts/app.js'
        ])
        .pipe(concat('app.min.js'))
        //.pipe(jsmin())
        .pipe(gulp.dest('./public/scripts'));
});

gulp.task("data", function(){
    return gulp.src('src/*.json')
        .pipe(gulp.dest("./public/"));
});

gulp.task("view", function(){
	return gulp.src('src/*.pug')
    	.pipe(pug({pretty: true}))
        .pipe(gulp.dest("./public"));
});


//Automatizamos esta tarea
gulp.task('watch', function() {
    //gulp.watch(['app/dist/css/app.min.css'], ['min-aplication-css']);
	gulp.watch(['src/scripts/*.js'], ['scripts']);
	gulp.watch(['src/*.pug','src/**/*.pug'], ['view']);
	gulp.watch(['src/styles/*.styl'], ['styles']);
});


//ejecutamos el servidor y todos los archivos
//gulp.task('default', ['watch', 'library-bower-js', 'main-aplication-js', 'library-vendor-css', 'min-aplication-css']);
gulp.task('default', ['watch', 'data', 'libraries-js', 'libraries-css', 'styles', 'view', 'scripts']);
