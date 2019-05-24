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
            if(list){
                list.forEach(ele=>{
                    if(ele.tel==$("#telPhone").val()){
                        telflag=true;
                        $(this).parent().parent().children(".error").hide();
                         $(this).parent().parent().children(".error1").show();
                    }else{
                        telflag=false;
                    }
                })
            }
             telflag=false;
           }
           
        });
        $("#code").blur(function (e) { 
           if(!/[a-zA-Z0-9]{6}/.test($("#telPhone").val())&&$(this).val()!=""){
               codeflag=true;
            $(this).parent().parent().children(".error").show();
           }else{
            codeflag=false;
           }
        });
        $("#pwd").blur(function (e) { 
           if(!/.{6,}/.test($("#pwd").val())&&$(this).val()!=""){
                pwdflag=true;
            $(this).parent().parent().children(".error").hide();
            $(this).parent().parent().children(".error1").show();
           }else{
           pwdflag=false;
           }
           if(/^(?:\d*|[a-zA-Z]*|[\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]*)$/.test($("#pwd").val())&&$(this).val()!=""){
            pwdflag=true;
            $(this).parent().parent().children(".error1").hide();
            $(this).parent().parent().children(".error").show();
           }else{
            pwdflag=false;
           }
           
        });
        $("#pwdAgain").blur(function (e) { 
           if( $("#pwdAgain").val()!= $("#pwd").val()&&$(this).val()!=""){
            pwdAgainflag=true;
            $(this).parent().parent().children(".error").show();
           }else{
            pwdAgainflag=false;
           }
        });
        //注册
        $("#submitButton").click(function(){
            if($("#telPhone").val()==""||$("#pwd").val()==""||$("#pwdAgain").val()==""||$("#code").val()==""){
                alert("还有未填入的信息");
            }else{
                if(telflag||codeflag||pwdflag||pwdAgainflag) {
                    alert("还有未按要求输入的信息");
                }else{
                    console.log("开始注册");
                    console.log(localStorage.getItem("user"));
                    let list=JSON.parse(localStorage.getItem("user"));
                    console.log(list)
                    let temp=[];
                    if(list){
                       list.forEach(ele=> {
                        temp.push(ele);
                    }); 
                    }
                    temp.push({tel:$("#telPhone").val(),pwd:$("#pwd").val()})
                    localStorage.setItem("user",JSON.stringify(temp));
                    // addCookie("user",JSON.stringify({tel:$("#telPhone").val(),pwd:$("#pwd").val()}))
                    console.log("写入完成");
                    window.location="http://localhost:9999/pages/login/login.html";//跳转
                    
                }
            }
           
        })
        function addCookie(key,value) {
            var now = new Date();
            now.setDate(now.getDate() + 7);//设置七天之后过期
            document.cookie = key+"="+value+"; expires="+now;
        }
        
        function getCookie(key) {
            var str = document.cookie; 
            if(!str) return null;
            
            var reg1 = new RegExp(key+"=([^;]+)$");
            var reg2 = new RegExp(key+"=([^;]+);");
            if(reg1.test(str)) {
                return str.match(reg1)[1];
            } else {
                return str.match(reg2)[1];
            }
        }
		});
	})
