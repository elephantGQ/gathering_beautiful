require(["../../static/conf/config.js"], function(){
	require(["jquery","lodash"], function($,_){
		let loginUser=JSON.parse(sessionStorage.getItem("loginUser"));
			if(loginUser){
				$(".isLogin").html(`<li>${loginUser.tel}</li><li><a href="#" class="loginOut">退出</a></li>`);
			}
			//获取购物车
			let productList=JSON.parse(localStorage.getItem("cart"));
			console.log(productList);
			var compiled=_.template($("#cartSmall").text())
			var str=compiled({"data":productList});
			console.log(str);
			$("#cart_content").html(str);

			var compiled=_.template($("#cartBig").text())
			var str=compiled({"data":productList});
			console.log(str);
			$(".productBox").html(str);
			//大购物车
			$(".bigCartExtend").click(function(){
					$(".bigCart").show();
			})
			$(".close").click(function(){
				$(".bigCart").hide();
			})
			//小购物车展开
			$(".shopCar").mouseenter(function(){
				$(".shopCartBox").show();
				console.log("进来了");
			})
			$(".shopCar").mouseleave(function(){
				$(".shopCartBox").hide();
			})
			$(".loginOut").click(function(){
				$(".isLogin").html(`<li><a href="../login/login.html">请登录</a></li><li><a href="../regist/regist.html">快速注册</a></li>`)
				sessionStorage.removeItem("loginUser")
			})
			$(".jumei").mouseover(function () { 
				$(this).children(".sub_nav").show();
				$(this).children('a').children("em").removeClass("icon-icon-arrowdown-expa").addClass("icon-icon-arrowup");
			});
			$(".jumei").mouseout(function () { 
				$(this).children(".sub_nav").hide();
				$(this).children('a').children("em").removeClass("icon-icon-arrowup").addClass("icon-icon-arrowdown-expa");
			});
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
		

		
		
	
		let sumTemp=sessionStorage.getItem("productAccount");
			if(sumTemp==null){
				sumTemp = 0;
				}
			$(".cart_num").html(`${sumTemp}`);
		console.log(`http://localhost:8000/detail${window.location.search}`);
		
		$.ajax({
			type:"GET",
			url:`http://localhost:8000/detail${window.location.search}`,
			dataType:"json",
			success:function(data){
				console.log("开始了");
				// console.log(JSON.stringify(data));
				var compiled=_.template($("#temp_product").text())
				var str=compiled({"data":data.data});
				// console.log(str);
				$(".topMenu").html(str) ;
				let pid=$("#pidHiddle").attr("no");
			

				//获取购物车数量
				let productList=JSON.parse(localStorage.getItem("cart"));
				let sum=0;
				productList.forEach(ele=> {
					sum+=ele.count;
				});
				console.log(sum);
				console.log($(".cart_num"));
				localStorage.setItem("productAccount",sum);
				$(".cart_num").html(sum.toString());

				$.ajax({
						type:"GET",
						url:`http://localhost:8000/suggest?pid=${pid}`,
						dataType:"json",
						success:function(res){
							console.log("开始了");
							// console.log(JSON.stringify(res));
							var compiled=_.template($("#suggestTemp").text())
							var str=compiled({"data":res});
							// console.log(str);
							$("#suggestOpt").html(str) ;
							$(".proAdd:last").remove();
							$(".ULPrice a").text(`￥${$(".currentPrice").text()}`)

							//添加购物车点击事件
							$("#go_to_cart").click(function(){
								console.log("加入购物车") 
							   let  proBall=$(`<div id="ball"></div>`);
							   proBall.css({
								   left:$(this).offset().left+91,
								   top:$(this).offset().top-20,
							   })
							   $(document.body).append(proBall);
							   // console.log($("#liCart").offset()) 
							   //开始抛物线运动

							   
							   parabola(proBall,$("#liCart"))
							   //获取这个商品的隐藏信息
							   console.log($(".proInfo").html())
							   let tempProduct=JSON.parse($(".proInfo").html());
							   console.log(tempProduct)
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

						   //详情的ajax
						   $.ajax({
							type:"GET",
							url:`http://localhost:8000/test${window.location.search}`,
							dataType:"html",
							success:function(data){
								console.log("详情开始了")
								var reg = /<img[^>]*>/gi;
								var imgs=data.match(reg);
								imgs.forEach((ele,i)=>{
									if(i>=2) $("#detailInfo").append($(ele))
								})
							}
				
						})
				}})
				
			}
		})
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

	});
})