const gulp=require("gulp");
const webserver=require("gulp-webserver");
const express=require("express");
const babel=require("gulp-babel");
const uglify=require("gulp-uglify");
const sass=require("gulp-sass");
const csso=require("gulp-csso");
const http=require("http");
const https=require("https");
const autoprefixer=require("gulp-autoprefixer");

gulp.task("compileJS",()=>{
    //先编译编译用的js
    gulp.src("src/scripts/**/*.js")
        //先编译
        .pipe(babel({
            presets:["@babel/env"]
        }) ) 
        .pipe( uglify() )//压缩js
        .pipe( gulp.dest("dist/scripts") ) 
    //编译网页用的js
    gulp.src("src/pages/**/*.js")
        .pipe(babel({
            presets:["@babel/env"]
        }) ) 
        .pipe( uglify() )//压缩js
        .pipe( gulp.dest("dist/pages") )
    //把静态的都移到目标
    gulp.src("src/static/**/*").pipe(gulp.dest("dist/static"))
})
gulp.task("compileCSS",()=>{
//先把sass编译成css
    gulp.src("src/styles/**/*.scss")
        .pipe( sass() )
        .pipe( autoprefixer() )
        //压缩css
        .pipe( csso() )
        .pipe( gulp.dest("dist/styles") )

})
gulp.task("compileHTML",()=>{
    gulp.src("src/pages/**/*.html")
    .pipe( gulp.dest("dist/pages") )
})
gulp.task("moveImg",()=>{
    gulp.src("src/imgs/**/*")
    .pipe( gulp.dest("dist/imgs") )
})
gulp.task("server",()=>{
    //静态服务器
    gulp.src("dist")
        .pipe( webserver({
            livereload : true,
            port : 9999
        }) )
    //监听文件
    gulp.watch("src/pages/**/*.js", ["compileJS"]);
	gulp.watch("src/scripts/**/*.js", ["compileJS"]);
	gulp.watch("src/styles/**/*.scss", ["compileCSS"]);
	gulp.watch("src/pages/**/*.html", ["compileHTML"])
    let app = express();
    app.get("/", (req,res)=>{
        res.setHeader("Access-Control-Allow-Origin","*"); //cros
        res.setHeader("Content-Type","text/plain; charset=utf8");
        res.end();
    })
    app.get("/city", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = http.request({
			hostname: "bj.jumei.com",
			path: "/Ajax/GetHomeTodayLists/100/1",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	});
    app.listen(8000);
})
gulp.task("build", ["compileJS","compileHTML","compileCSS"])