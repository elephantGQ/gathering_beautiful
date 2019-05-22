require(["../../static/conf/config.js"], function(){
	require(["jquery","lodash"], function($,_){
        $("input").on("focusin",function(){
            $(this).parent().parent().children(".error").hide();
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
    console.log($("#telPhone").val())
        $("#telPhone").blur(function (e) { 
           if(!/\d{11}/.test($("#telPhone").val())&&$(this).val()!=""){
            $(this).parent().parent().children(".error").show();
           }
        });
        $("#code").blur(function (e) { 
           if(!/[a-zA-Z0-9]{6}/.test($("#telPhone").val())&&$(this).val()!=""){
            $(this).parent().parent().children(".error").show();
           }
        });
        $("#pwd").blur(function (e) { 
           if(!/.{6,}/.test($("#pwd").val())&&$(this).val()!=""){
            $(this).parent().parent().children(".error").hide();
            $(this).parent().parent().children(".error1").show();
           }
           if(/^(?:\d*|[a-zA-Z]*|[\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]*)$/.test($("#pwd").val())&&$(this).val()!=""){
            $(this).parent().parent().children(".error1").hide();
            $(this).parent().parent().children(".error").show();
           }
           
        });
        $("#pwdAgain").blur(function (e) { 
           if( $("#pwdAgain").val()!= $("#pwd").val()&&$(this).val()!=""){
            $(this).parent().parent().children(".error").show();
           }
        });
		});
	})
