require(["../../static/conf/config.js"], function(){
	require(["jquery","lodash"], function($,_){

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
				console.log(pid);
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
				}})
				document.getElementById("myiframe").src = `http://10.9.69.117:8000/test${window.location.search}`
			}
		})
	

	});
})