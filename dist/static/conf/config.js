requirejs.config({
	baseUrl : "http://localhost:9999/",
	paths : {
		"vali" : "scripts/libs/jquery.validate",
		"jquery" : "scripts/libs/jquery-2.0.3.min",
		"sw" : "scripts/libs/swiper.min",
		"myTemp":"scripts/libs/myTemplate",
		"lodash":"scripts/libs/lodash.min",
		"jq.cookie" : "scripts/libs/jquery.cookie",
		"bootstrap" : "scripts/libs/bootstrap",
		"jquery.ui" : "scripts/libs/jquery-ui.min",
		"css" : "scripts/libs/css",  //加载CSS文件的插件
	},
	shim : {
		"jq.cookie" : {
			deps : ["jquery"]
		},
		"sw" : {
			deps : ["css!styles/swiper.css"]
		},
		"bootstrap" : {
			deps : [ 
				"jquery",
				"css!styles/bootstrap.css"
			]
		}
	}
})