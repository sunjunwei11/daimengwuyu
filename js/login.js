/*sign up code*/
var Server_address = "http://45.76.195.125:8088"
/*var Server_address = "http://127.0.0.1:8088"*/

$('#signup_user_id').blur(function(){ /*判断该用户名是否已被注册*/
    var userid = $("#signup_user_id").val();
    userid_can_use = false;
    if (userid == ""){
        $('#signup-user-id-tip').css("display","none");
        $('#signup-user-id-tip').text("用户名不能为空").addClass("tishi").slideDown(300);
        $('#signup-password-tip').css("color","red");         
    }
    else{
        $.ajax({
            url: Server_address + "/check_userid",
            type: "post",
            data: {
                userid: userid,
            },
            datatype: "json",
            async: true,
            crossDomain: true,
            success: function(result) {
                if(result["can_use"]==true){
                    $('#signup-user-id-tip').css("display","none");
                    $('#signup-user-id-tip').text("此用户名可用").addClass("tishi").slideDown(300); 
                    $('#signup-password-tip').css("color","green");
                    userid_can_use = true; 
                }
                else{
                    $('#signup-user-id-tip').css("display","none");
                    $('#signup-user-id-tip').text("此用户名已被注册").addClass("tishi").slideDown(300);
                    $('#signup-password-tip').css("color","red");  
                    }
            }
        });       
    }	
});

$('#signup-password-repeat').blur(function(){/*检查两次输入密码是否相同*/
    var password = $("#signup-password").val()
    var password_repeat = $("#signup-password-repeat").val()
    password_can_use = false;
    if (password == password_repeat) {
        $('#signup-password-tip').css("display","none");
        $('#signup-password-tip').css("margin-bottom","0.4em");
        $('#signup-password-tip').text("两次输入密码相同").addClass("tishi").slideDown(300); 
        $('#signup-password-tip').css("color","green");       
        password_can_use = true;
    }
    else {
        $('#signup-password-tip').css("display","none");
        $('#signup-password-tip').text("两次输入密码不同，请重新输入").addClass("tishi").slideDown(300);
        $('#signup-password-tip').css("color","red");        
    }
})

$('.select_head_picture').click(function(){/*注册时点击选择头像按钮时进入选择头像界面*/
    select_picture = "head_picture";
    $('.select_head_picture').css("background-color","#b9c6dc");
    window.setTimeout(function(){window.location="#select_picture"},100);
});

$('.select_fabu_picture').click(function(){/*发布状态时点击选择图片按钮时进入选择图片界面*/
    $('#fabu_content_div > img').remove();
    select_picture = "fabu_picture";
    window.location="#select_picture";
});

$('.images > img').click(function(){ /*点击要选择的图片*/
    var chosed =  $(this).attr("chosed");

    if (chosed == "1"){
        $(this).css("opacity","1");
        $(this).attr("chosed","0");
    }else if (chosed == "0"){
        var image_src =  this.src;
        $(this).css("opacity","0.4");
        $(this).attr("chosed","1");
    }
    
});

$('#select_picture_determine').click(function(){ /*选择图像后点击确定按钮*/
    var chosed_pic = $("[chosed='1']");
    var pic_number = chosed_pic.length;
    if (select_picture == "head_picture"){/*select_picture值为head_picture，说明当前执行的是选择头像的操作*/
        if (pic_number == 0) {alert("还未选择图片");}
        else if (pic_number > 1) {alert("只能选择一张图片作为头像");}
        else if (pic_number == 1) {
            selected_head_pic_src = $("[chosed='1']")[0].src;
            selected_head_pic_src = selected_head_pic_src.substring(selected_head_pic_src.indexOf("picture"));
            console.log(selected_head_pic_src);
            $('.select_head_picture').css('background-image',"url('./"+selected_head_pic_src + "')");
            $('.select_head_picture').css("opacity",1);
            $('.select_head_picture > p').css('display','none');
            $('#mengmengda').text("头像已选择");
            window.location="#sign";
        }
    }
    else if (select_picture == "fabu_picture"){/*select_picture值为fabu_picture,说明当前执行的是选择发布内容选择图片的操作*/
        if (pic_number == 0) {alert("还未选择图片");}
        else if (pic_number >= 1){
            selected_fabu_pic_src = [];
            var imgs = $('#fabu_content_div');
            chosed_pic.each(function(){
                $(this).css("opacity","1");
                $(this).attr("chosed","0"); 
                var this_src = this.src;
                this_src = this_src.substring(this_src.indexOf("picture"));
                selected_fabu_pic_src = selected_fabu_pic_src.concat(this_src);
                var cNode = this.cloneNode(true)
                imgs.append(cNode);
            });
            window.location = "#fabu_page";
        }
    }
    console.log(pic_number);
});


$('#signup').click(function(){/*点击注册提交按钮，提交注册的信息，并返回注册是否成功的标识*/
    var userid = $("#signup_user_id").val();
    var password = $("#signup-password-repeat").val();
    var nickname = $("#signup-user-name").val() || "-";
    var user_mobile = $("#signup-user-mobile").val() || "-";
    var user_email = $("#signup-user-email").val() || "-";
    var user_address = $("#signup-user-address").val() || "-" ;
    if (userid_can_use && password_can_use) {
        $.ajax({
            url: Server_address + "/signup",
            type: "post",
            data: {
                userid: userid,
                password: password,
                selected_head_pic_src: selected_head_pic_src,
                user_mobile: user_mobile,
                user_email: user_email,
                user_address: user_address
            },
            datatype: "json",
            async: true,
            crossDomain: true,
            success: function(result) {
                if(result["success"]==true){
                    $('#signup-result').css("display","none");
                    $('#signup-result').text("注册成功").addClass("tishi").slideDown(300);
                    $('#signup-result').css("color","green");
                    $('#login_userid').val(userid);
                    $('#login_password').val(password);
                    window.setTimeout(function(){window.location="#login"},300);
                }
                else{
                    $('#signup-result').css("display","none");
                    $('#signup-result').text("注册失败").addClass("tishi").slideDown(300);
                    $('#signup-result').css("color","red");
                    }
            }
        }); 
    }
    else {
        $('#signup-result').css("display","none");
        $('#signup-result').text("用户名或密码有误").addClass("tishi").slideDown(300);
        $('#signup-result').css("color","red");  
    }
});

$('#login_button').click(function(){/*点击登录按钮，从数据库提取该用户数据，返回在页面显示*/
    var login_userid =$('#login_userid').val();
    var login_password =$('#login_password').val();
    if (login_userid && login_password){
        $.ajax({
            url: Server_address + "/login",
            type: "post",
            data: {
                userid: login_userid,
                password: login_password
            },
            datatype: "json",
            async: true,
            crossDomain: true,
            success: function(result){
                if (result["success"] == "no_this_user"){
                    $('#login-result').css("display","none");
                    $('#login-result').text("该用户不存在").addClass("tishi").slideDown(300);
                    $('#login-result').css("color","red"); 
                }
                else if(result["success"] == "password_wrong"){
                    $('#login-result').css("display","none");
                    $('#login-result').text("密码错误").addClass("tishi").slideDown(300);
                    $('#login-result').css("color","red");                    
                }
                else if(result["success"] == true){
                    $('#login-result').css("display","none");
                    $('#login-result').text("用户名和密码输入正确").addClass("tishi").slideDown(300);
                    $('#login-result').css("color","green"); 
                    $('#per_phone_number').text(result["per_inf"]["phone_number"]);
                    $('#per_email').text(result["per_inf"]["email"]);
                    $('#per_address').text(result["per_inf"]["address"]);
                    $('.per_head_picture').css("background-image","url('./" + result['per_inf']['head_pic'] + "')");
                    var messages = result["message"];
                    var messages_len = messages.length;
                    var main_content = $('#main_content');
                    for (var i =0;i<messages_len;i++){
                    /*插入好友圈中的各条信息，a_message为一个模板，将实际信息的相关字段替换掉a_message里的字段，并插入到网页的相关位置*/
                        var a_message = 
                            '<div class="message" message_id="this_message_id">\
                                    <div class="mess_head">\
                                        <div class="head_picture" style="background-image: url(this_message_head_pic);"></div>\
                                        <div class="mess_name_time">\
                                            <div class="mess_name" >孙俊威</div>\
                                            <div class="mess_time" >this_message_time</div>\
                                        </div>\
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
                        replace(/this_message_dianzan_number/,messages[i]["dianzan_number"]).
                        replace(/this_message_pinglun_number/,messages[i]["pinglun_number"]).
                        replace(/this_message_head_pic/,"\'./"+result['per_inf']['head_pic']+"\'");
                        var this_message_content_pic = messages[i]["user_picture"].split(',');/*此为该条信息下的发布的图片，各图片之间用逗号分隔*/
                        var this_message_content_pic_len = this_message_content_pic.length;/*计算有几张图片*/
                        var this_message_content_pic_str = "";
                        if (this_message_content_pic_len == 0){
                            a_message = a_message.replace(/this_message_content_pic/,"");
                        }else if(this_message_content_pic_len == 1){
                            this_message_content_pic_str = "<img style='width:15em;height:15em' src='./" + this_message_content_pic[0] + "'>";
                        }else if(this_message_content_pic_len == 2 || this_message_content_pic_len == 4){
                            for (var j=0;j<this_message_content_pic_len;j++){
                                this_message_content_pic_str = this_message_content_pic_str + 
                                "<img style='width:10em;height:10em' src='./" + this_message_content_pic[j] + "'>";
                            }/*将所有图片写成一个字符串，并插入到相关位置*/
                        }else{
                            for (var j=0;j<this_message_content_pic_len;j++){
                                this_message_content_pic_str = this_message_content_pic_str + 
                                "<img style='width:6.6em;height:6.6em' src='./" + this_message_content_pic[j] + "'>";
                            }
                        }
                        a_message = a_message.replace(/this_message_content_pic/,this_message_content_pic_str);
                        if (messages[i]["if_dianzan"] == 0){/*该用户对该信息已点赞，则显示信息时其颜色为红色，不然为灰色*/
                            a_message = a_message.replace(/shifoudianzhan/,"dianzhan");
                        }else{
                            a_message = a_message.replace(/shifoudianzhan/,"yidianzhan");
                        }
                        main_content.append(a_message);
                    }

                    window.setTimeout(function(){window.location="#main";},300);                  
                }
            }        
        });
    }
    else{
        $('#login-result').css("display","none");
        $('#login-result').text("用户名和密码不能为空").addClass("tishi").slideDown(300);
        $('#login-result').css("color","red"); 
    } 
});



$('.fabu').click(function(){/*点击发布按钮，跳转到发布内容的页面*/
    $('.fabu').css("text-shadow","0px 0px 1px black");
    window.setTimeout(function(){
        window.location="#fabu_page";
        $('.fabu').css("text-shadow","none");
    },300);
});

$('.shuaxin').click(function(){/*点击刷新按钮，刷新页面*/
    $('.shuaxin').css("text-shadow","0px 0px 1px black");
    $('#main_content > .message').remove();
    document.getElementById('login_button').click();
    window.setTimeout(function(){
        $('.shuaxin').css("text-shadow","none");
    },300);
});

$('#fasong').click(function(){ /*发布状态时，输入要发布的内容后，点击发送按钮执行的函数*/
    $('#fasong').css("text-shadow","0px 0px 1px black").css("background-color","rgba(171, 200, 172, 0.960784)");
    var userid = $('#personal_information_name').text();
    var renwusheding = $('#renwusheding_content').val() || "-";
    var fabu_content = $('#fabu_content').val() || "-";
    var now_time = new Date();
    var message_time = now_time.getFullYear()+"-"+(now_time.getMonth()+1) +"-"+ now_time.getDate() +
        " " + now_time.getHours()+":"+now_time.getMinutes()+":"+now_time.getSeconds()
    console.log(userid,renwusheding,fabu_content,message_time)
    if (fabu_content == "-"){
        alert("发布内容不能为空");
    }else{
        $.ajax({
            url: Server_address + "/message_receive",
            type: "post",
            data: {
                userid: userid,
                renwusheding: renwusheding,
                fabu_content: fabu_content,
                message_time: message_time,
                selected_fabu_pic_src: selected_fabu_pic_src.toString()
            },
            datatype: "json",
            async: true,
            crossDomain: true,
            success:function(result){
                if (result["success"] == true){
                    console.log("消息上传成功");
                    window.setTimeout(function(){window.location="#main"},300);
                    window.setTimeout(function(){
                        $('#fasong').css("text-shadow","none").css("background-color","transparent");},300);
                }
            }
        });
    }

});

$('.personal_infor').click(function(){ /*点击查看个人信息按钮，进入个人信息界面*/
    window.location = "#personal_information"
});

function dianzhan(this_dianzhan){ /*点击点赞按钮执行的函数*/
    var message_id = this_dianzhan.parentNode.parentNode.getAttribute("message_id");
    var dianzhan_username = $('#personal_information_name').text();
    var now_time = new Date();
    var dianzan_time = now_time.getFullYear()+"-"+(now_time.getMonth()+1) +"-"+ now_time.getDate() +
        " " + now_time.getHours()+":"+now_time.getMinutes()+":"+now_time.getSeconds()
    console.log(message_id,dianzhan_username,dianzan_time);
    $.ajax({
        url: Server_address + "/dianzhan",
        type: "post",
        data:{
            message_id:message_id,
            dianzhan_username:dianzhan_username,
            dianzan_time:dianzan_time
        },
        datatype: "json",
        async: true,
        crossDomain: true,
        success:function(result){
            if (result["if_dianzhan"] == 0){
                this_dianzhan.style.color = "red";
                this_dianzhan.getElementsByClassName("dianzhan_number")[0].innerHTML = result["message_dianzan_number"];
            } 
            else{
                this_dianzhan.style.color = "gray";
                this_dianzhan.getElementsByClassName("dianzhan_number")[0].innerHTML = result["message_dianzan_number"];
            }
        }
    });
}

function pinglun(this_pinglun){ /*点击评论按钮时执行的函数*/
    $('#pinglun_content > .message').remove();
    pinglun_message_id = this_pinglun.parentNode.parentNode.getAttribute("message_id");
    pinglun_username = $('#personal_information_name').text();
    var pinglun_number = this_pinglun.getElementsByClassName("pinglun_number")[0].innerHTML;
    console.log(pinglun_number);
    if (pinglun_number == 0){ /*如果只有0条评论，直接进入写评论的界面*/
        window.location="#write_pinglun_page";
    }else{
        $.ajax({
            url: Server_address + "/pinglun_return", /*向服务器请求该条消息的评论信息*/
            type: "post",
            data: {
                pinglun_message_id: pinglun_message_id
            },
            datatype: "json",
            async: true,
            crossDomain: true,
            success:function(result){
                var pingluns = result["pinglun"];
                var pingluns_len = pingluns.length;
                var pinglun_content = $('#pinglun_content');
                for (var i =0;i<pingluns_len;i++){
                   var a_pinglun = 
                    '<div class="message" style="border: none;">\
                        <div class="mess_head">\
                            <div class="head_picture" style="background-image: url(this_pinglun_head_pic);"></div>\
                            <div class="mess_name_time">\
                                <div class="mess_name" >this_pinglun_username</div>\
                                <div class="mess_time" >this_pinglun_time</div>\
                            </div>\
                        </div>\
                        <div class="pinglun_content">\
                            <p>this_pinglun_content</p>\
                        </div>\
                    </div>'
                    a_pinglun = a_pinglun.replace(/this_pinglun_time/,pingluns[i]["time"]).
                    replace(/this_pinglun_content/,pingluns[i]["content"]).
                    replace(/this_pinglun_username/,pingluns[i]["username"]).
                    replace(/this_pinglun_head_pic/,"\'./"+pingluns[i]["head_pic"]+"\'");
                    pinglun_content.append(a_pinglun);
                    window.location="#show_pinglun_page";

             }} 
        });
}}

$('#fabu_pinglun_h1').click(function(){
    $('#fabu_pinglun_h1').css("text-shadow","0px 0px 1px black").css("background-color","rgba(171, 200, 172, 0.960784)");
    window.setTimeout(function(){window.location="#write_pinglun_page"},300);
    window.setTimeout(function(){
        $('#fabu_pinglun_h1').css("text-shadow","none").css("background-color","transparent");},300);
});

$('#fasong_pinglun').click(function(){ /*发布评论时，输入要发布的内容后，点击发送按钮执行的函数*/
    $('#fasong_pinglun').css("text-shadow","0px 0px 1px black").css("background-color","rgba(171, 200, 172, 0.960784)");
    var shuxei_pinglun_content = $('#shuxei_pinglun_content').val() || "-";
    var now_time = new Date();
    var pinglun_time = now_time.getFullYear()+"-"+(now_time.getMonth()+1) +"-"+ now_time.getDate() +
        " " + now_time.getHours()+":"+now_time.getMinutes()+":"+now_time.getSeconds()
    console.log(shuxei_pinglun_content,pinglun_time)
    if (shuxei_pinglun_content == "-"){
        alert("发布内容不能为空");
        $('#fasong_pinglun').css("text-shadow","none").css("background-color","transparent");
    }else{
        $.ajax({
            url: Server_address + "/pinglun_receive",
            type: "post",
            data: {
                pinglun_username: pinglun_username,
                pinglun_message_id: pinglun_message_id,
                shuxei_pinglun_content: shuxei_pinglun_content,
                pinglun_time: pinglun_time
            },
            datatype: "json",
            async: true,
            crossDomain: true,
            success:function(result){
                if (result["success"] == true){
                    console.log("消息上传成功");
                    window.setTimeout(function(){window.location="#main"},300);
                    window.setTimeout(function(){
                        $('#fasong_pinglun').css("text-shadow","none").css("background-color","transparent");},300);
                }
            }
        });
    }

});