/*这是程序启动时的初始化程序*/
var Server_address = "http://45.76.195.125:8088" /*如果访问的是远程服务器则使用远程服务器的ip地址*/
/*var Server_address = "http://127.0.0.1:8080"*/
var server_url = document.URL;
console.log(server_url);
if (server_url.indexOf("workspace") > -1){/*如果是本地直接打开，则使用的服务器路径为./*/
    Server_address = "./"
}else if(server_url.indexOf("8080") > -1){/*如果url是8080端口打开，则说明是本地eclipse服务器，用本地服务器地址*/
    Server_address = "http://127.0.0.1:8080";
}
console.log("Server_address:" + Server_address);
var remeng_clicked = 0;/*刚登录，该值设为0表示热门按钮未被点击*/
var now_page_is_guanzhu_or_remeng = "guanzhu"; /*该值用来表示当前显示的信息界面为关注界面还是热门界面，主要用来点击刷新按钮时刷新不同的界面*/

var login_userid = localStorage.getItem("login_userid");  /*获取存储在本地的用户名和密码*/
var login_password = localStorage.getItem("login_password");
if (login_userid != null && login_password != null){
    $('#login_userid').val(login_userid);
    $('#login_password').val(login_password);
}

var userAgent = navigator.userAgent
if (userAgent.indexOf("Android") > -1){
    equipment = "Android";
    var pingmu_availWidth = window.screen.availWidth;
    var pingmu_width = pingmu_availWidth - 32 - 2*8;/*此为选择图片时，显示图片的界面屏幕宽度*/
    /*包含img的外层div的padding为16，所以要减去32，一张img的padding为2，所以减去0.15*8*/
    console.log("pingmu_width:" + pingmu_width);
    console.log("1/4 pingmu_width:" + pingmu_width/4);
    $(".images > img").css("padding","2px").css("width",pingmu_width/4).css("height",pingmu_width/4);
    $("#fabu_content_div > img").css("padding","2px").css("width",pingmu_width/4).css("height",pingmu_width/4);

    var message_1_pic_pingmu_width = (pingmu_availWidth -20 - 2*2) * 0.65;/*当发布的信息中配图为1张时，显示的图片宽度*/
    var message_2_pic_pingmu_width = (pingmu_availWidth -8*2 - 18 )/2;/*当发布的信息中配图为2张时，显示的图片宽度 8为margin-left的像素，即0.5em，再预留8像素空间*/
    var message_3_pic_pingmu_width = (pingmu_availWidth -8*3 - 18 )/3;/*当发布的信息中配图为3张时，显示的图片宽度 8为margin-left的像素，即0.5em，再预留8像素空间*/
}else{
    equipment = "not_Android";
    $(".images > img").css("padding","0.15em").css("width","5em").css("height","5em");
    $("#fabu_content_div > img").css("padding","0.15em").css("width","5em").css("height","5em");
}
