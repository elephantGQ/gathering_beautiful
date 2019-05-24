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
            path: "/Ajax/GetHomeTodayLists/200/1",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
    });
    app.get("/search", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = http.request({
            /*
            https://s.mobile.jumei.com/api/v1/product/detailStatic?ab=3%3Ac%7C7%3Ac%7C114%3Aa11%7C120%3Ac%7C123%3Ab%7C131%3Ac%7C150%3Aa%7C160%3Ac%7C164%3Av6%7C166%3Ab%7C177%3Avideo2t6%7C179%3Avideo3t2%7C186%3Avideo4t11%7C191%3Ac%7C241%3Ac%7C242%3Ab%7C281%3Av6%7C666%3Ab%7C673%3Ac%7C703%3Awvgre_a%7C909%3Aa%7C1001%3Ab%7C1200%3Aa6%7C1300%3Anormal%7C1655%3Av6%7C1806%3Anormal%7C1807%3Af%7C1808%3Aa11%7C1809%3Aa11%7C1810%3Anormal%7C6680%3Aa%7C8998%3Ab%7C9081%3Ac%7C9091%3Ab%7C9108%3Avideofeedb%7C9902%3Ae1%7C73162%3Ad%7C73163%3Ac%7C73164%3Af&antifraud_sign=f296b56d8f0ff41289f9087bf1f4aae6&antifraud_tid=931266086&antifraud_ts=1558337446&app_id=com.jumei.iphone&appfirstinstall=1&client_v=8.000&global_init_log_device_model=iPhone10%2C3&global_init_log_device_vendor=apple&global_init_log_os_version=12.1.1&global_init_log_push_enable=off&global_init_log_push_id=101d855909049cb68d3%2C570eb3520274a418e0ec098a36e6df6f&item_id=d190426p3284720&platform=iphone&selllabel=%E8%8A%B1%E5%8D%B0%E6%B8%85%E6%96%B0%E5%87%80%E9%A2%9C%E5%8D%B8%E5%A6%86%E6%B0%B4%E5%A5%97%E7%BB%84&selltype=mSearch&site=bj&source=AppstoreI1&type=jumei_deal&user_tag_id=131
            */
			hostname: "s.mobile.jumei.com",
            path: "/api/v1/product/detailStatic?ab=3%3Ac%7C7%3Ac%7C114%3Aa11%7C120%3Ac%7C123%3Ab%7C131%3Ac%7C150%3Aa%7C160%3Ac%7C164%3Av6%7C166%3Ab%7C177%3Avideo2t6%7C179%3Avideo3t2%7C186%3Avideo4t11%7C191%3Ac%7C241%3Ac%7C242%3Ab%7C281%3Av6%7C666%3Ab%7C673%3Ac%7C703%3Awvgre_a%7C909%3Aa%7C1001%3Ab%7C1200%3Aa6%7C1300%3Anormal%7C1655%3Av6%7C1806%3Anormal%7C1807%3Af%7C1808%3Aa11%7C1809%3Aa11%7C1810%3Anormal%7C6680%3Aa%7C8998%3Ab%7C9081%3Ac%7C9091%3Ab%7C9108%3Avideofeedb%7C9902%3Ae1%7C73162%3Ad%7C73163%3Ac%7C73164%3Af&antifraud_sign=f296b56d8f0ff41289f9087bf1f4aae6&antifraud_tid=931266086&antifraud_ts=1558337446&app_id=com.jumei.iphone&appfirstinstall=1&client_v=8.000&global_init_log_device_model=iPhone10%2C3&global_init_log_device_vendor=apple&global_init_log_os_version=12.1.1&global_init_log_push_enable=off&global_init_log_push_id=101d855909049cb68d3%2C570eb3520274a418e0ec098a36e6df6f&item_id=d190426p3284720&platform=iphone&selllabel=%E8%8A%B1%E5%8D%B0%E6%B8%85%E6%96%B0%E5%87%80%E9%A2%9C%E5%8D%B8%E5%A6%86%E6%B0%B4%E5%A5%97%E7%BB%84&selltype=mSearch&site=bj&source=AppstoreI1&type=jumei_deal&user_tag_id=131",
            method: 'get'
           
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
    });
    app.get("/detail", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
        res.setHeader("Content-Type","text/plain; charset=utf8")
        // console.log(req);
        let urlReq=res.req._parsedUrl.search;
    	let proxy = https.request({
            hostname: "api.jumei.com",
			path: `/Product/DetailDynamic${urlReq}&client_v=8.000&global_init_log_push_enable=off&platform=iphone1&type=jumei_deal`,
            method: 'get',
            headers: {
				'Content-Type': 'text/html',
				
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
			}
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
    });
    app.get("/detailMore", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
        res.setHeader("Content-Type","text/plain; charset=utf8")
        // https://s.mobile.jumei.com/api/v1/product/detailStatic?&client_v=8.000&global_init_log_push_enable=off&platform=iphone&type=jumei_deal&item_id=d190426p3284720
        let urlReq=res.req._parsedUrl.search;
    	let proxy = https.request({
            hostname: "s.mobile.jumei.com",
			path: `/api/v1/product/detailStatic${urlReq}&client_v=8.000&global_init_log_push_enable=off&platform=iphone&type=jumei_deal`,
            method: 'get',
            headers: {
				'Content-Type': 'text/html',
				
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
			}
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
    });
    app.get("/test", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
        res.setHeader("Content-Type","text/html; charset=utf8")
        /*
http://s.h5.jumei.com/mobile/deal/product_union?type=jumei_deal&item_id=d190426p3284720
        */
    //    console.log(res.req.query);
       let urlReq=res.req.query["item_id"];
		let proxy = https.request({
			hostname: "s.h5.jumei.com",
			path: `/mobile/deal/product_union?type=jumei_deal&item_id=${urlReq}`,
            method: 'get',
            headers: {
				'Content-Type': 'text/html',
				// 'Content-Length' : 2149,
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
			}
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
    app.get("/suggest", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
        res.setHeader("Content-Type","text/html; charset=utf8")
        /*
            http://www.jumei.com/i/ajax/get_deal_recommend_group?pid=3284720
        */
    //    console.log(res.req.query);
       let urlReq=res.req.query;
		let proxy = https.request({
			hostname: "www.jumei.com",
			path: `/i/ajax/get_deal_recommend_group?pid=${urlReq.pid}`,
            method: 'get',
            headers: {
				'Content-Type': 'text/html',
				// 'Content-Length' : 2149,
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
			}
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
    app.get("/global", (req,res)=>{
        res.setHeader("Access-Control-Allow-Origin","*"); //cors
        res.setHeader("Content-Type","text/plain; charset=utf8")
        // https://api.jumei.com/Deal/DealLimitBuy?card_id=9562&client_v=8.000&platform=iphone
		let proxy = http.request({
			hostname: "api.jumei.com",
            path: "/Deal/DealLimitBuy?card_id=9562&client_v=8.000&platform=iphone",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
  
    
    app.listen(8000);
})
gulp.task("build", ["compileJS","compileHTML","compileCSS"])