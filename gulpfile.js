'use strict';

let gulp = require('gulp'),
  connect = require('gulp-connect'),
  del = require('del'),
  tsc = require('gulp-typescript'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jsonmin = require('gulp-jsonmin'),
  shell = require('child_process'),
  paths = {
    vendor: [
      'node_modules/phaser/dist/phaser.js',
      'node_modules/phaser-input/build/phaser-input.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/systemjs/dist/system.js'
    ],
    tsConfig: 'src/ts/tsconfig.json',
    ts: 'src/**/*.ts',
    html: 'src/**/*.html',
    images: ['src/assets/images/**/*.png',
      'src/assets/images/**/*.jpg'],
    tilemaps: 'src/assets/tilemaps/**/*.json'
  };

gulp.task('clean', () => del('dist/'));

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('images', () => {
  return gulp.src(paths.images)
    .pipe(gulp.dest('dist/assets/images/'))
    .pipe(connect.reload());
});

gulp.task('html', () => {
  return gulp.src(paths.html)
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('tilemaps', () => {
  return gulp.src(paths.tilemaps)
    .pipe(jsonmin())
    .pipe(gulp.dest('dist/assets/tilemaps/'))
    .pipe(connect.reload());
});

gulp.task('vendor', () => {
  return gulp.src(paths.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('tsc', () => {
  let tsProject = tsc.createProject(paths.tsConfig);
  let tsResult = tsProject.src().pipe(tsc(tsProject));
  return tsResult.js
    .pipe(gulp.dest('dist/game/'))
    .pipe(connect.reload());
});

gulp.task('verify', (done) => {
  let tsProject = tsc.createProject(paths.tsConfig);
  let tsResult = tsProject.src().pipe(tsc(tsProject));
  return tsResult.js
    .on('error', function (error) {
      process.exit(1);
      done();
    }).on('success', () => done());
});

gulp.task('test', (cb) => {
  return shell.exec('npm test', (err, stdout, stderr) => {
    console.log(stdout);
    cb(err);
  })
});

gulp.task('deploy', (cb) => {
  return shell.execFile('./deploy.sh', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
});

gulp.task('watch', () => {
  let watchTs = gulp.watch(paths.ts, gulp.series('tsc')),
    watchHtml = gulp.watch(paths.html, gulp.series('html')),
    watchTilemaps = gulp.watch(paths.tilemaps, gulp.series('tilemaps')),
    watchImages = gulp.watch(paths.images, gulp.series('images')),
    onChanged = (event) => console.info(event.path + ' was ' + event.type + '. Running tasks...');

  watchTs.on('change', onChanged);
  watchHtml.on('change', onChanged);
  watchTilemaps.on('change', onChanged);
  watchImages.on('change', onChanged);
});

gulp.task('build', gulp.parallel('images', 'html', 'tilemaps', 'tsc', 'vendor'));
gulp.task('default', gulp.parallel('build', 'connect', 'watch'));
gulp.task('release', gulp.series('verify', 'test', 'build', (done) => {
  done();
}));
