require(["../../static/conf/config.js"], function(){
	require(["jquery","sw","lodash"], function($,Swiper,_){
		$(function(){
			let loginUser=JSON.parse(localStorage.getItem("loginUser"));
			if(loginUser){
				$(".isLogin").html(`<li>${loginUser.tel}</li><li><a href="#" class="loginOut">退出</a></li>`);
			}
			$(".loginOut").click(function(){
				$(".isLogin").html(`<li><a href="../login/login.html">请登录</a></li><li><a href="../regist/regist.html">快速注册</a></li>`)
				localStorage.removeItem("loginUser")
			})
			$(".jumei").mouseover(function () { 
				$(this).children(".sub_nav").show();
				$(this).children('a').children("em").removeClass("icon-icon-arrowdown-expa").addClass("icon-icon-arrowup");
			});
			$(".jumei").mouseout(function () { 
				$(this).children(".sub_nav").hide();
				$(this).children('a').children("em").removeClass("icon-icon-arrowup").addClass("icon-icon-arrowdown-expa");
			});
			let mySwiper = new Swiper('.swiper-container', {
				autoplay: true,//可选选项，自动滑动
				effect : "fade", //切换效果，淡出
				loop : true ,    //环路
				pagination: {
					el: '.swiper-pagination',
					clickable :true  ,
					centeredSlides:true  //页面居zhong
					// type : 'circle',
					// renderCustom: function(swiper, current, total) {
					//     var customPaginationHtml = "";
					//     for(var i = 0; i < total; i++) {
					//         //判断哪个分页器此刻应该被激活
					//         if(i == (current - 1)) {
					//             customPaginationHtml += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
					//         } else {
					//             customPaginationHtml += '<span class="swiper-pagination-customs"></span>';
					//         }
					//     }
					//     return customPaginationHtml;
					// }
				  },
				
			})
			$(".mzStore").mouseover(()=>{
				$(".mzStore em").removeClass("icon-icon-arrowdown-expa").addClass("icon-icon-arrowup");
				$(".mzsc").show()
			})
			$(".mzStore").mouseout(()=>{
				let flag=true;
				let t=setTimeout(()=>{
					$(".mzsc").mouseover(()=>{
						clearTimeout(t);
						flag=false;
					})
						
					$(".mzsc").mouseout(()=>{
						$(".mzStore em").removeClass("icon-icon-arrowup").addClass("icon-icon-arrowdown-expa");
					$(".mzsc").hide();
					})
					
					if(flag){
						$(".mzStore em").removeClass("icon-icon-arrowup").addClass("icon-icon-arrowdown-expa");
						$(".mzsc").hide();
					}
					
				},1000)
				
			})
			$(".btToday").click(()=>{
				$(".todayOpt").show();
				$(".btToday").addClass("current").siblings().removeClass("current");
	
			})
			$(".btTommon").click(()=>{
				$(".todayOpt").hide()
				$(".btTommon").addClass("current").siblings().removeClass("current");
			})
			let sumTemp=localStorage.getItem("productAccount");
			if(sumTemp==null){
				sumTemp = 0;
				}
			$(".cart_num").html(`${sumTemp}`);
			//抛物线运动
			function parabola(ele, stop){
				// console.log("抛物线启动")
				// console.log(ele.offset())
				// console.log(stop.offset())
				//y == a*x^2 + bx + c 
				//原点
				var start={
					x:ele.offset().left,
					y:ele.offset().top
				}
				// console.log(start);
				//目标点的 相对坐标系位置
				var end={
					x:stop.offset().left-start.x,
					y:start.y-stop.offset().top,
				}
				// console.log(end);
				//系数
				var a = -0.0015;
				// b = (y - ax^2)/x
				var b=(end.y-a*end.x*end.x)/end.x;
				var _x=0;
				var t=setInterval(function(){
					_x+=8;
					ele.css({
						left:_x+start.x
					})
					var _y = a*_x*_x + b*_x;
					ele.css({
						top:start.y-_y
					})
					if(_x>=end.x){
						ele.css({
							left:stop.offset().left,
							top:stop.offset().top
						})
						clearInterval(t);
						ele.remove();
						$(".cart_num").html(parseInt($(".cart_num").html())+1);
					}
				}, 20);
			}
			// console.log($("#mustSeeDiv").text());
			$.ajax({
				type:"GET",
				url:"http://localhost:8000/global",
				dataType:"json",
				success:function(data){
					console.log(data.data.card.material);
					console.log($("#mustSeeDiv").text());
					var compiled=_.template($("#mustSeeDiv").text());
					console.log(compiled)
					data=data.data.card.material
					var str=compiled({"data":data});
					$(".mustCheckOut").html(str);
				}
			})

			
			//节流
			function throttle(fn,delay){
				let last =0;
				return function(){
					let now=new Date().getTime();
					if(now-last>delay) {
						fn()
						last =new Date().getTime();
					}
				}
			}
			$(window).scroll(throttle(()=>{
				// console.log($(window).scrollTop()+"****"+$("#todayNew").position().top)
				if($(window).scrollTop()>=($("#todayNew").position().top-900)){
					console.log("ajax开始了")
					
					$.ajax({
						type:"GET",
						url:"http://localhost:8000/city",
						dataType:"json",
						success:function(data){
							var compiled=_.template($("#temp_product").text())
							var str=compiled({"data":data});
							$(".productlist").html(str) ;
							$(".productBox").mouseenter(function(){
								$(this).children(".coverOn").show();
							})
							$(".productBox").mouseleave(function(){
								$(this).children(".coverOn").hide();
							})
							$(".cartBox").click(function(){
								// console.log($(this).offset()) 
								let  proBall=$(`<div id="ball"></div>`);
								proBall.css({
									left:$(this).offset().left+40,
									top:$(this).offset().top-20,
								})
								$(document.body).append(proBall);
								// console.log($("#liCart").offset()) 
								//开始抛物线运动
								parabola(proBall,$("#liCart"))
								//获取这个商品的隐藏信息
								let tempProduct=JSON.parse($(this).parent().siblings(".proInfo").html());
								//获取本地的购物车信息
								let productList=JSON.parse(localStorage.getItem("cart"));
								//获取本地的商品的个数
								let sum=localStorage.getItem("productAccount");
								if(sum==null){
									sum = 0;
								}
								sum++;
								let temp=[];
								let isExist=false;
								if(productList){
									productList.forEach(ele=> {
										if(ele.pid!=tempProduct.pid){
											temp.push(ele);
										}else{
											isExist=true;
											ele.count++;
											temp.push(ele);
										}
									});
								}
								if(!isExist){
									temp.push(tempProduct);
								}
								localStorage.setItem("cart",JSON.stringify(temp));
								localStorage.setItem("productAccount",sum);
							})
						}
					})

					$(window).unbind("scroll");
				}
			},100))
			
		})
		});
	})
