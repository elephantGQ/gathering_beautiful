require(["../../static/conf/config.js"], function(){
	require(["jquery","lodash"], function($,_){
        let productList=JSON.parse(localStorage.getItem("cart"));
        var compiled=_.template($("#temp_product").text())
							var str=compiled({"data":productList});
							$("#myProduct").html(str) ;
            console.log($(".decrease_one"))
            //减号
            $(".decrease_one").click(function(){
                let count=Number($(this).siblings(".item_quantity").val());
                count--;
                $(this).siblings(".item_quantity").val(count);
                let productList=JSON.parse(localStorage.getItem("cart"));
                let sum=JSON.parse(localStorage.getItem("productAccount"));
                sum--;
                localStorage.setItem("productAccount",sum)
                let temp=[];
                let pid=$(this).parent().parent().parent().siblings(":first").find(".pid").html();
                console.log(pid);
                productList.forEach(ele => {
                    if(ele.pid==pid) ele.count--;
                    if(ele.count!=0) temp.push(ele);
                    if(ele.count==0)  $(this).parent().parent().parent().parent().remove();
                });
                localStorage.setItem("cart",JSON.stringify(temp))
                let price=Number($(".decrease_one:first").parent().parent().parent().siblings().eq(1).find(".jumei_price").html());
                let allprice=Number($(".total_price").html());
                $(".total_price").html(allprice-price)
                $(".group_total_price").html("￥"+$(".total_price").html());
                console.log(price);
                let total_amount=Number($(".total_amount").html());
                $(".total_amount").html(--total_amount);
            })
            //加号
            $(".increase_one").click(function(){
                //获取现在这个商品有多少个
                let count=Number($(this).siblings(".item_quantity").val());
                count++;
                $(this).siblings(".item_quantity").val(count);
                //获取购物车商品列表
                let productList=JSON.parse(localStorage.getItem("cart"));
                //获取一共多少商品
                let sum=JSON.parse(localStorage.getItem("productAccount"));
                sum++;
                //将总数重新写进去
                localStorage.setItem("productAccount",sum)
                let temp=[];
                //获取隐藏在也页面中的商品编号
                let pid=$(this).parent().parent().parent().siblings(":first").find(".pid").html();

                productList.forEach(ele => {
                    if(ele.pid==pid) ele.count++;
                    temp.push(ele);
                });
                localStorage.setItem("cart",JSON.stringify(temp))
                let price=Number($(".decrease_one:first").parent().parent().parent().siblings().eq(1).find(".jumei_price").html());
                let allprice=Number($(".total_price").html());
                $(".total_price").html(allprice+price)
                $(".group_total_price").html("￥"+$(".total_price").html());
                let total_amount=Number($(".total_amount").html());
                $(".total_amount").html(++total_amount);
            })
            //删除建
            $(".delete_item").click(function(){
                let productList=JSON.parse(localStorage.getItem("cart"));
                let temp=[];
                let pid=$(this).parent().parent().parent().siblings(":first").find(".pid").html();
                productList.forEach(ele => {
                    if(ele.pid!=pid) temp.push(ele);
                });
                localStorage.setItem("cart",JSON.stringify(temp))
                console.log($(this).parent().parent().siblings().eq(1).find(".jumei_price").html());
                let price=Number($(this).parent().parent().siblings().eq(1).find(".jumei_price").html());
                let count=$(this).parent().parent().siblings().eq(2).find(".item_quantity").val();
                let allprice=Number($(".total_price").html());
                $(this).parent().parent().parent().remove();
                console.log(price);
                console.log(count);
                console.log(allprice);
                $(".total_price").html(allprice-price*count)
                $(".group_total_price").html("￥"+$(".total_price").html());
                localStorage.setItem("productAccount",localStorage.getItem("productAccount")-count)
            })
            console.log($(".item_quantity"))
            console.log($(".increase_one"))
            console.log($(".delete_item"))
	});
})