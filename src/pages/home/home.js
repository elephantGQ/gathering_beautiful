require(["../../static/conf/config.js"], function(){
	require(["jquery","sw","lodash"], function($,Swiper,_){
		$(function(){
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
						}
					})

					$(window).unbind("scroll");
				}
			},100))
			
		})
		});
	})
