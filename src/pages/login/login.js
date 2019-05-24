require(["../../static/conf/config.js"], function(){
	require(["jquery","lodash"], function($,_){
        let telflag=false;
        let codeflag=false;
        let pwdflag=false;
        let pwdAgainflag=false;

        /*
            // 1、保存数据到本地
            // 第一个参数是保存的变量名，第二个是赋给变量的值
            localStorage.setItem('Author', 'local');
            // 2、从本地存储获取数据
            localStorage.getItem('Author');
            // 3、从本地存储删除某个已保存的数据
            localStorage.removeItem('Author');
            // 4、清除所有保存的数据
            localStorage.clear();
        */
        //输入提示信息
        $("#loginRadio1").click(function(){
            $(".loginBord").css({
                // height:418
            })
            $("#login-dynamic-form").show();
            $("#login-user-form").hide();

        })
        $("#loginRadio2").click(function(){
           $(".loginBord").css({
            //    height:476
           })
            $("#login-dynamic-form").hide();
            $("#login-user-form").show();

        })
        $("input").on("focusin",function(){
            $(this).parent().parent().children(".error").hide();
            $(this).parent().parent().children(".error1").hide();
            $(this).parent().parent().children(".focus_text").show();
            // console.log( $(this).parent());
            $(this).parent().parent().css({
                "box-shadow": "0 0 4px rgba(165,212,237,.075)"
            })
        })
        $("input").on("focusout",function(){
            $(this).parent().parent().children(".focus_text").hide();
            $(this).parent().parent().css({
                "box-shadow": "0"
            })
        })
        //输入错误提示信息
        $("#telPhone").blur(function (e) { 
           if(!/\d{11}/.test($("#telPhone").val())&&$(this).val()!=""){
              telflag=true;
              $(this).parent().parent().children(".error1").hide();
              $(this).parent().parent().children(".error").show();
           }else{
            let list=JSON.parse(localStorage.getItem("user"));
            let exist=false;
            if(list){
                list.forEach(ele=>{
                    if(ele.tel==$("#telPhone").val()){
                        telflag=true;
                        exist=true;
                    }else{
                        telflag=false;
                    }
                })  
                if(!exist){
                        $(this).parent().parent().children(".error").hide();
                         $(this).parent().parent().children(".error1").show();
                    }
            }
             telflag=false;
           }
           
        });
      
        $("#pwd").blur(function (e) { 
           if(!/.{6,}/.test($("#pwd").val())&&$(this).val()!=""){
                pwdflag=true;
            $(this).parent().parent().children(".error").hide();
           }else{
           pwdflag=false;
           }
           
        });
        
        //登陆
        $("#submitButton1").click(function(){
           
            let list=JSON.parse(localStorage.getItem("user"));
            console.log(list)
             list.forEach(ele=>{
                 console.log(ele.tel+" "+ele.pwd)
                 console.log($("#telPhone").val()+" "+$("#pwd").val())
                 if(ele.tel==$("#telPhone").val()&&ele.pwd==$("#pwd").val()){
                    console.log(JSON.stringify({tel:$("#telPhone").val(),pwd:$("#pwd").val()}));
                    sessionStorage.setItem("loginUser",JSON.stringify({tel:$("#telPhone").val(),pwd:$("#pwd").val()}));
                    console.log("写入完成");
                    window.location="http://localhost:9999/pages/home/home.html";
                 }else{
                    $(this).parent().parent().children(".error").show();
                 }
             })     
           
        })
        
		});
	})
