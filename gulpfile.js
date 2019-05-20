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
			hostname: "sh.jumei.com",
            path: "/Ajax/GetHomeTodayLists/100/1",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
    });
    app.get("/test", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		res.setHeader("Accept","application/json, text/javascript, */*; q=0.01")
        res.setHeader("Cookie","PHPSESSID=mrk8sr2sf4688f1r8sqd8mgf4t; _csrf=3975d459229e99679f14f0b519e437447725805269db8453628e94ea8ad2b209a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22heeUCXM9GMh4d5AmvkJt3-vhcYKY4pi_%22%3B%7D; Hm_lvt_b78b855beb1ef43b5411c934b93bb0b3=1558175573; Hm_lpvt_b78b855beb1ef43b5411c934b93bb0b3=1558175584")

		let proxy = https.request({
			hostname: "zshpldbz.com",
			path: `/index/choicegoods.html?sort=new&size=20&p=1`,
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
    app.listen(8000);
})
gulp.task("build", ["compileJS","compileHTML","compileCSS"])