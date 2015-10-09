

var gulp = require("gulp");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var fs = require("fs");


gulp.task("default", function(){

	gulp.watch("./*.ts", ["tsbuild"]);
})


var prj = ts.createProject("tsconfig.json")
gulp.task("tsbuild", function(){

		return gulp.src("./*.ts")
		// .pipe(tslint({rulesDirectory:"rulesOut/"}))
		// .pipe(tslint.report("verbose"))
		.pipe(ts(prj))
		.pipe(gulp.dest("./rulesOut/"));
})