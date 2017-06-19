function guanzhu(this_guanzhu){ /*点击信息右边关注按钮时执行的函数*/
	var guanzhu_username = this_guanzhu.parentNode.getElementsByClassName("mess_name")[0].innerHTML;
	console.log("guanzhu_username:" + guanzhu_username);
	var login_userid = localStorage.getItem("login_userid") || $('#personal_information_name').text();
	var shifouguanzhu = this_guanzhu.innerHTML;
	if (shifouguanzhu == "+关注"){
		$.ajax({
			url: Server_address + "/guanzhu",
	        type: "post",
	        data: {
	            login_userid: login_userid,
	            guanzhu_username: guanzhu_username
	        },
	        datatype: "json",
	        async: true,
	        crossDomain: true,
	        success:function(result){
	        	if (result["success"] == true){
	        		this_guanzhu.innerHTML = "已关注";
	        		this_guanzhu.setAttribute("class", "yiguanzhu"); 
	        	}
	        }
		});
	}
}

$(".scan").click(function(){ /*点击右上角+号去添加关注时，执行的函数*/
	$(".scan").css("background-color","rgba(220, 220, 220, 0.81)");
	window.setTimeout(function(){
        window.location='#add_guanzhu_page';
        $(".scan").css("background-color","white");
    },200);
});

$("#jinxing_sousuo").click(function(){ /*在搜索关注好友界面,点击进行搜索按钮时执行的函数*/
    $('#jinxing_sousuo').css("text-shadow","0px 0px 1px black").css("background-color","rgba(171, 200, 172, 0.960784)");
    window.setTimeout(function(){
    	$('#jinxing_sousuo').css("text-shadow","none").css("background-color","transparent");},300);
    var login_userid = localStorage.getItem("login_userid") || $('#personal_information_name').text();
    var search_user_name = $('#search_user_name').val();
    if (search_user_name == ""){
    	alert("搜索内容不能为空");
    }else {
    	$.ajax({
            url: Server_address + "/search_userid",
            type: "post",
            data: {
            	login_userid:login_userid,
                search_user_name: search_user_name
            },
            datatype: "json",
            async: true,
            crossDomain: true,
            success:function(result){
            	if (result["success"] == "no_this_user"){
            		console.log("no this user");
            	}else if(result["success"] == true){
            		var add_guanzhu_page_content = $('.add_guanzhu_page_content');
            		var per_inf = result["per_inf"]
	                var a_message = 
		                    '<div class="message" message_id="this_message_id" style="background-color:transparent;">\
		                        <div class="mess_head">\
		                            <div class="head_picture" style="background-image: url(this_message_head_pic);"></div>\
		                            <div class="mess_name_time">\
		                                <div class="mess_name" >this_message_userid</div>\
		                                <div class="mess_time" >简介:暂无介绍</div>\
		                            </div>\
		                            <div class="shifouguanzhu" onClick="guanzhu(this)">是否关注</div>\
		                        </div>\
		                     </div>';
                    a_message = a_message.replace(/this_message_userid/,per_inf["userid"]).
                    replace(/this_message_head_pic/,"\'./"+per_inf['head_pic']+"\'");
	                if (per_inf["userid"] == login_userid){
	                    a_message = a_message.replace(/shifouguanzhu/,"yiguanzhu");
	                    a_message = a_message.replace(/是否关注/,"自己");                            
	                }else if (result["if_guanzhu"] == 0){/*对该用户未进行关注，显示信息时其颜色为红色，不然为灰色*/
	                    a_message = a_message.replace(/shifouguanzhu/,"add_guanzhu");
	                    a_message = a_message.replace(/是否关注/,"+关注");
	                }else{
	                    a_message = a_message.replace(/shifouguanzhu/,"yiguanzhu");
	                    a_message = a_message.replace(/是否关注/,"已关注");
	                }
                    add_guanzhu_page_content.append(a_message);
            	}
            }
    	})
    }
});

$('#remeng').click(function(){ /*点击切换到热门信息界面按钮执行的函数*/
	now_page_is_guanzhu_or_remeng = "remeng"
	$('#remeng').css("color","black");
	$('#haoyou').css("color","gray");
	$('.haoyou > hr').css("display","none");
	$('.remeng > hr').css("display","block");
	var main_content = $('#main_content');
    var remeng_main_content = $('#remeng_main_content');
	if (remeng_clicked == 0){
		var login_userid = localStorage.getItem("login_userid") || $('#personal_information_name').text();
		$.ajax({
	        url: Server_address + "/remeng",
	        type: "post",
	        data: {
	        	login_userid:login_userid
	        },
	        datatype: "json",
	        async: true,
	        crossDomain: true,
	        success:function(result){
	            var messages = result["message"];
	            var messages_len = messages.length;
	            if (messages_len == 0){
	                a_message = '<p class="atishi" style="color:green;padding:1em;text-shadow:0 0 1px black;">当前没有热门信息~\
	                            </p>';
	                remeng_main_content.append(a_message);
	            }else{
                    for (var i =0;i<messages_len;i++){
                    /*插入好友圈中的各条信息，a_message为一个模板，将实际信息的相关字段替换掉a_message里的字段，并插入到网页的相关位置*/
                        var a_message = 
                            '<div class="message" message_id="this_message_id">\
                                    <div class="mess_head">\
                                        <div class="head_picture" style="background-image: url(this_message_head_pic);"></div>\
                                        <div class="mess_name_time">\
                                            <div class="mess_name" >this_message_userid</div>\
                                            <div class="mess_time" >this_message_time</div>\
                                        </div>\
                                        <div class="shifouguanzhu" onClick="guanzhu(this)">是否关注</div>\
                                    </div>\
                                    <div class="renwusheding">\
                                        <p>人物设定：this_message_renwusheding</p>\
                                    </div>\
                                    <div class="mess_content">\
                                        <p>this_message_content</p>\
                                    </div>\
                                    this_message_content_pic\
                                    <div class="dianzhan_pinglun">\
                                        <div class="shifoudianzhan" onClick="dianzhan(this)">点赞 <span class="dianzhan_number">this_message_dianzan_number</span></div>\
                                        <div class="pinglun" onClick="pinglun(this)">评论 <span class="pinglun_number">this_message_pinglun_number</span></div>\
                                    </div>\
                                </div>'
                        a_message = a_message.replace(/this_message_time/,messages[i]["message_time"]).
                        replace(/this_message_renwusheding/,messages[i]["renwusheding"]).
                        replace(/this_message_content/,messages[i]["content"]).
                        replace(/this_message_id/,messages[i]["id"]).
                        replace(/this_message_userid/,messages[i]["user_id"]).
                        replace(/this_message_dianzan_number/,messages[i]["dianzan_number"]).
                        replace(/this_message_pinglun_number/,messages[i]["pinglun_number"]).
                        replace(/this_message_head_pic/,"\'./"+messages[i]["user_head_picture"]+"\'");
                        var this_message_content_pic = messages[i]["user_picture"].split(',');/*此为该条信息下的发布的图片，各图片之间用逗号分隔*/
                        var this_message_content_pic_len = this_message_content_pic.length;/*计算有几张图片*/
                        var this_message_content_pic_str = "";
                        if (this_message_content_pic_len == 0){
                            a_message = a_message.replace(/this_message_content_pic/,"");
                        }else if(this_message_content_pic_len == 1){
                            if (equipment == "Android"){
                                this_message_content_pic_str = "<img style='width:" + message_1_pic_pingmu_width
                                 + "px;height:" + message_1_pic_pingmu_width + "px;' src='./" + this_message_content_pic[0] + "'>";
                            }else{
                                this_message_content_pic_str = "<img style='width:15em;height:15em' src='./" + this_message_content_pic[0] + "'>";
                            }
                        }else if(this_message_content_pic_len == 2 || this_message_content_pic_len == 4){
                            if (equipment == "Android") {
                                for (var j=0;j<this_message_content_pic_len;j++){
                                    this_message_content_pic_str = this_message_content_pic_str + "<img style='width:" + message_2_pic_pingmu_width
                                     + "px;height:" + message_2_pic_pingmu_width + "px;' src='./" + this_message_content_pic[j] + "'>";
                                }/*将所有图片写成一个字符串，并插入到相关位置*/
                            }else{
                                for (var j=0;j<this_message_content_pic_len;j++){
                                    this_message_content_pic_str = this_message_content_pic_str + 
                                    "<img style='width:10em;height:10em' src='./" + this_message_content_pic[j] + "'>";
                                }/*将所有图片写成一个字符串，并插入到相关位置*/
                            }
                        }else{
                            if (equipment == "Android") {
                                for (var j=0;j<this_message_content_pic_len;j++){
                                    this_message_content_pic_str = this_message_content_pic_str + "<img style='width:" + message_3_pic_pingmu_width
                                     + "px;height:" + message_3_pic_pingmu_width + "px;' src='./" + this_message_content_pic[j] + "'>";
                                }/*将所有图片写成一个字符串，并插入到相关位置*/
                            }else{
                                for (var j=0;j<this_message_content_pic_len;j++){
                                    this_message_content_pic_str = this_message_content_pic_str + 
                                    "<img style='width:6.5em;height:6.5em' src='./" + this_message_content_pic[j] + "'>";
                                }/*将所有图片写成一个字符串，并插入到相关位置*/
                            }
                        }
                        a_message = a_message.replace(/this_message_content_pic/,this_message_content_pic_str);
                        if (messages[i]["if_dianzan"] == 0){/*该用户对该信息已点赞，则显示信息时其颜色为红色，不然为灰色*/
                            a_message = a_message.replace(/shifoudianzhan/,"dianzhan");
                        }else{
                            a_message = a_message.replace(/shifoudianzhan/,"yidianzhan");
                        }

                        if (messages[i]["user_id"] == login_userid){
                            a_message = a_message.replace(/shifouguanzhu/,"yiguanzhu");
                            a_message = a_message.replace(/是否关注/,"自己");                            
                        }else if (messages[i]["if_guanzhu"] == 0){/*对该用户未进行关注，显示信息时其颜色为红色，不然为灰色*/
                            a_message = a_message.replace(/shifouguanzhu/,"add_guanzhu");
                            a_message = a_message.replace(/是否关注/,"+关注");
                        }else{
                            a_message = a_message.replace(/shifouguanzhu/,"yiguanzhu");
                            a_message = a_message.replace(/是否关注/,"已关注");
                        }
                        remeng_main_content.append(a_message);
	                    main_content.css("display","none");
	                    remeng_main_content.css("display","block");
                    }
	            }

	        }
		});
		remeng_clicked = 1
	}else if(remeng_clicked == 1){
        main_content.css("display","none");
        remeng_main_content.css("display","block");
	}

});

$('#haoyou').click(function(){ /*点击切换到关注信息界面执行的函数*/
	now_page_is_guanzhu_or_remeng = "guanzhu"
	$('#haoyou').css("color","black");
	$('#remeng').css("color","gray");
	$('.remeng > hr').css("display","none");
	$('.haoyou > hr').css("display","block");
    var main_content = $('#main_content');
    var remeng_main_content = $('#remeng_main_content');
    main_content.css("display","block");
    remeng_main_content.css("display","none");
});

$('.shuaxin').click(function(){/*点击刷新按钮，刷新页面*/
	$('.shuaxin').css("text-shadow","0px 0px 1px black");
    window.setTimeout(function(){
        $('.shuaxin').css("text-shadow","none");
    },300);
	if (now_page_is_guanzhu_or_remeng == "guanzhu"){ /*如果当前页面为关注界面，则执行重新点击登录按钮操作，刷新关注页面信息*/
	    $('#main_content > .message').remove();
	    $('#main_content > .atishi').remove();
	    if (login_userid != null && login_password != null){
	        $('#login_userid').val(login_userid);
	        $('#login_password').val(login_password);
	    }
	    document.getElementById('login_button').click();
	}else if(now_page_is_guanzhu_or_remeng == "remeng"){/*如果当前页面为热门界面，则执行此函数，刷新热门页面信息*/
		$('#remeng_main_content > .message').remove();
	    $('#remeng_main_content > .atishi').remove();
		var main_content = $('#main_content');
    	var remeng_main_content = $('#remeng_main_content');
		var login_userid = localStorage.getItem("login_userid") || $('#personal_information_name').text();
		$.ajax({
	        url: Server_address + "/remeng",
	        type: "post",
	        data: {
	        	login_userid:login_userid
	        },
	        datatype: "json",
	        async: true,
	        crossDomain: true,
	        success:function(result){
	            var messages = result["message"];
	            var messages_len = messages.length;
	            if (messages_len == 0){
	                a_message = '<p class="atishi" style="color:green;padding:1em;text-shadow:0 0 1px black;">当前没有热门信息~\
	                            </p>';
	                remeng_main_content.append(a_message);
	            }else{
                    for (var i =0;i<messages_len;i++){
                    /*插入好友圈中的各条信息，a_message为一个模板，将实际信息的相关字段替换掉a_message里的字段，并插入到网页的相关位置*/
                        var a_message = 
                            '<div class="message" message_id="this_message_id">\
                                    <div class="mess_head">\
                                        <div class="head_picture" style="background-image: url(this_message_head_pic);"></div>\
                                        <div class="mess_name_time">\
                                            <div class="mess_name" >this_message_userid</div>\
                                            <div class="mess_time" >this_message_time</div>\
                                        </div>\
                                        <div class="shifouguanzhu" onClick="guanzhu(this)">是否关注</div>\
                                    </div>\
                                    <div class="renwusheding">\
                                        <p>人物设定：this_message_renwusheding</p>\
                                    </div>\
                                    <div class="mess_content">\
                                        <p>this_message_content</p>\
                                    </div>\
                                    this_message_content_pic\
                                    <div class="dianzhan_pinglun">\
                                        <div class="shifoudianzhan" onClick="dianzhan(this)">点赞 <span class="dianzhan_number">this_message_dianzan_number</span></div>\
                                        <div class="pinglun" onClick="pinglun(this)">评论 <span class="pinglun_number">this_message_pinglun_number</span></div>\
                                    </div>\
                                </div>'
                        a_message = a_message.replace(/this_message_time/,messages[i]["message_time"]).
                        replace(/this_message_renwusheding/,messages[i]["renwusheding"]).
                        replace(/this_message_content/,messages[i]["content"]).
                        replace(/this_message_id/,messages[i]["id"]).
                        replace(/this_message_userid/,messages[i]["user_id"]).
                        replace(/this_message_dianzan_number/,messages[i]["dianzan_number"]).
                        replace(/this_message_pinglun_number/,messages[i]["pinglun_number"]).
                        replace(/this_message_head_pic/,"\'./"+messages[i]["user_head_picture"]+"\'");
                        var this_message_content_pic = messages[i]["user_picture"].split(',');/*此为该条信息下的发布的图片，各图片之间用逗号分隔*/
                        var this_message_content_pic_len = this_message_content_pic.length;/*计算有几张图片*/
                        var this_message_content_pic_str = "";
                        if (this_message_content_pic_len == 0){
                            a_message = a_message.replace(/this_message_content_pic/,"");
                        }else if(this_message_content_pic_len == 1){
                            if (equipment == "Android"){
                                this_message_content_pic_str = "<img style='width:" + message_1_pic_pingmu_width
                                 + "px;height:" + message_1_pic_pingmu_width + "px;' src='./" + this_message_content_pic[0] + "'>";
                            }else{
                                this_message_content_pic_str = "<img style='width:15em;height:15em' src='./" + this_message_content_pic[0] + "'>";
                            }
                        }else if(this_message_content_pic_len == 2 || this_message_content_pic_len == 4){
                            if (equipment == "Android") {
                                for (var j=0;j<this_message_content_pic_len;j++){
                                    this_message_content_pic_str = this_message_content_pic_str + "<img style='width:" + message_2_pic_pingmu_width
                                     + "px;height:" + message_2_pic_pingmu_width + "px;' src='./" + this_message_content_pic[j] + "'>";
                                }/*将所有图片写成一个字符串，并插入到相关位置*/
                            }else{
                                for (var j=0;j<this_message_content_pic_len;j++){
                                    this_message_content_pic_str = this_message_content_pic_str + 
                                    "<img style='width:10em;height:10em' src='./" + this_message_content_pic[j] + "'>";
                                }/*将所有图片写成一个字符串，并插入到相关位置*/
                            }
                        }else{
                            if (equipment == "Android") {
                                for (var j=0;j<this_message_content_pic_len;j++){
                                    this_message_content_pic_str = this_message_content_pic_str + "<img style='width:" + message_3_pic_pingmu_width
                                     + "px;height:" + message_3_pic_pingmu_width + "px;' src='./" + this_message_content_pic[j] + "'>";
                                }/*将所有图片写成一个字符串，并插入到相关位置*/
                            }else{
                                for (var j=0;j<this_message_content_pic_len;j++){
                                    this_message_content_pic_str = this_message_content_pic_str + 
                                    "<img style='width:6.5em;height:6.5em' src='./" + this_message_content_pic[j] + "'>";
                                }/*将所有图片写成一个字符串，并插入到相关位置*/
                            }
                        }
                        a_message = a_message.replace(/this_message_content_pic/,this_message_content_pic_str);
                        if (messages[i]["if_dianzan"] == 0){/*该用户对该信息已点赞，则显示信息时其颜色为红色，不然为灰色*/
                            a_message = a_message.replace(/shifoudianzhan/,"dianzhan");
                        }else{
                            a_message = a_message.replace(/shifoudianzhan/,"yidianzhan");
                        }

                        if (messages[i]["user_id"] == login_userid){
                            a_message = a_message.replace(/shifouguanzhu/,"yiguanzhu");
                            a_message = a_message.replace(/是否关注/,"自己");                            
                        }else if (messages[i]["if_guanzhu"] == 0){/*对该用户未进行关注，显示信息时其颜色为红色，不然为灰色*/
                            a_message = a_message.replace(/shifouguanzhu/,"add_guanzhu");
                            a_message = a_message.replace(/是否关注/,"+关注");
                        }else{
                            a_message = a_message.replace(/shifouguanzhu/,"yiguanzhu");
                            a_message = a_message.replace(/是否关注/,"已关注");
                        }
                        remeng_main_content.append(a_message);
	                    main_content.css("display","none");
	                    remeng_main_content.css("display","block");
                    }
	            }

	        }
		});
		remeng_clicked = 1
	}

});
	                    