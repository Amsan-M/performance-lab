var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync');


var plumberErrorHandler = {
   errorHandler: notify.onError({
      title: 'Gulp',
      message: 'Error: <%= error.message %>'
   })
};

var sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssnano = require('gulp-cssnano'), 
rename = require("gulp-rename");

var uglify = require("gulp-uglify"),
  rename = require("gulp-rename");

  

gulp.task('sass', function() {
    return gulp
      .src('./sass/style.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest("./build/css"));
});

gulp.task('scripts', function(){
    gulp.src('./js/*.js')
      .pipe(gulp.dest('./build/js'))
});

gulp.task('browser-sync', function() {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });

   gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('watch', function() {
   gulp.watch('sass/*.scss', ['sass']);
   gulp.watch('js/*.js', ['scripts']);
});



 
gulp.task("gulp-uglify", function() {
  return gulp
    .src("./js/*.js")
    .pipe(uglify()) 
    .pipe(rename({ extname: ".min.js" })) 
    .pipe(gulp.dest("./build/js")); 
});
 



gulp.task('default', ['watch', 'browser-sync', 'gulp-uglify', 'sass',]);
