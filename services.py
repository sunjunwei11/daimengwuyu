# -*- coding: utf-8 -*-
import bottle,json,MySQLdb
from bottle import run, request, response, post, get, template, route, static_file
db = MySQLdb.connect("localhost", "root", "312312","daimengwuyu",charset="utf8")

@bottle.route('/index')
def index():
    return static_file("index.html",root=".")

@bottle.route('/js/<path>')
def server_js(path):
    return static_file(path, root='js')

@bottle.route('/css/<path>')
def server_css(path):
    return static_file(path, root='css')

@bottle.route('/picture/<path>')
def server_picture(path):
    return static_file(path, root='picture')

@bottle.route('/check_userid', method = 'POST')
def check_userid():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
    userid = request.POST.get('userid')
    userid = unicode(userid, "utf8")
    cr=db.cursor()#新建游标 
    cr.execute('''select userid FROM user_information ''')
    mysql_userids=cr.fetchall()[0][0]
    cr.close()
    result = {}
    if userid in mysql_userids:
        result["can_use"] = False
    else :
        result["can_use"] = True
    return result

@bottle.route('/signup', method = 'POST') #注册新用户时执行的函数
def signup():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
    userid = unicode(request.POST.get('userid'), "utf8")
    password = unicode(request.POST.get('password'), "utf8")
    selected_head_pic_src = unicode(request.POST.get('selected_head_pic_src'), "utf8")
    user_mobile = unicode(request.POST.get('user_mobile'), "utf8")
    user_email = unicode(request.POST.get('user_email'), "utf8")
    user_address = unicode(request.POST.get('user_address'), "utf8")
    print userid,password,selected_head_pic_src,user_mobile,user_email,user_address
    cr=db.cursor()#新建游标 
    cr.execute("INSERT INTO user_information (userid,password,selected_head_pic_src,phone_number,email,address) \
    VALUES (%s,%s,%s,%s,%s,%s)",(userid,password,selected_head_pic_src,user_mobile,user_email,user_address))
    db.commit()
    cr.close()
    result = {}
    result["success"] = True
    return result

@bottle.route('/login', method = 'POST') #用户登录执行的函数，并返回该用户的个人信息以及朋友圈的数据
def login():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'    
    userid = unicode(request.POST.get('userid'), "utf8")
    password = unicode(request.POST.get('password'), "utf8")
    result = {}
    cr = db.cursor()
    cr.execute("select userid FROM user_information")
    mysql_userids = cr.fetchall()
    userids = []
    for i in mysql_userids:
        userids.append(i[0])
    if userid in userids:
        cr.execute("select password,selected_head_pic_src,phone_number,email,address FROM user_information \
        WHERE userid=%s",(userid)) #获取该用户的个人信息
        personal_inf = cr.fetchall()[0]
        mysql_password = personal_inf[0]
        if password == mysql_password:
            result["success"] = True        
            result["per_inf"] = {}
            result["per_inf"]["head_pic"] = personal_inf[1]
            result["per_inf"]["phone_number"] = personal_inf[2]
            result["per_inf"]["email"] = personal_inf[3]
            result["per_inf"]["address"] = personal_inf[4]
            cr.execute("SELECT * FROM message")
            message_inf = cr.fetchall()
            result["message"] = []
            for i in message_inf:
                a_message = {}
                a_message["id"] = i[0]
                a_message["user_id"] = i[1]
                a_message["user_picture"] = i[2]
                a_message["message_time"] = i[3]
                a_message["renwusheding"] = i[4]
                a_message["content"] = i[5]
                a_message["dianzan_number"] = i[6]
                a_message["pinglun_number"] = i[7]
                cr.execute("SELECT COUNT(*) FROM dianzan WHERE message_id = %s AND dianzan_username = %s" ,(i[0],userid))
                #检查该用户是否已经对该条评论点赞
                if_dianzan = cr.fetchall()[0][0]
                a_message["if_dianzan"] = if_dianzan
                result["message"].append(a_message);
        else:
            result["success"] = "password_wrong"
    else:
        result["success"] = "no_this_user"
    cr.close()
    print "result:",result
    return result

@bottle.route('/message_receive', method = 'POST')
def message_receive():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token' 
    userid = unicode(request.POST.get('userid'), "utf8")
    renwusheding = unicode(request.POST.get('renwusheding'), "utf8")  
    fabu_content = unicode(request.POST.get('fabu_content'), "utf8")
    message_time = unicode(request.POST.get('message_time'), "utf8")
    selected_fabu_pic_src = unicode(request.POST.get('selected_fabu_pic_src'), "utf8")
    result = {}
    cr=db.cursor()#新建游标 
    cr.execute("INSERT INTO message (user_id,user_picture,message_time,renwusheding,content) \
    VALUES (%s,%s,%s,%s,%s)",(userid,selected_fabu_pic_src,message_time,renwusheding,fabu_content))
    db.commit()
    cr.close()
    result["success"] = True 
    print "上传的消息内容：",userid,message_time,renwusheding,fabu_content,selected_fabu_pic_src
    return result

@bottle.route('/dianzhan', method = 'POST')
def dianzhan():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'  
    message_id = unicode(request.POST.get('message_id'), "utf8")  
    dianzhan_username = unicode(request.POST.get('dianzhan_username'), "utf8") 
    dianzan_time = unicode(request.POST.get('dianzan_time'), "utf8") 
    result = {}
    cr = db.cursor()
    cr.execute("SELECT COUNT(*) FROM dianzan WHERE message_id = %s AND dianzan_username = %s" ,(message_id,dianzhan_username))
    if_dianzhan = cr.fetchall()[0][0]
    result["if_dianzhan"] = if_dianzhan
    cr.execute("SELECT COUNT(*) FROM dianzan WHERE message_id = %s" ,(message_id))
    message_dianzan_number = cr.fetchall()[0][0]
    if (if_dianzhan) == 0:
        print dianzhan_username + u"对消息message" + message_id + u"进行了点赞"
        result["yidianzan"] = 0
        cr.execute("INSERT INTO dianzan (message_id,dianzan_username,dianzan_time) VALUES (%s,%s,%s)",(message_id,dianzhan_username,dianzan_time)) 
        db.commit() 
        message_dianzan_number += 1
    else:
        print dianzhan_username + u"对消息message" + message_id + u"取消了点赞"
        result["yidianzan"] = 1
        cr.execute("DELETE FROM dianzan WHERE message_id = %s AND dianzan_username = %s" ,(message_id,dianzhan_username))
        db.commit()
        message_dianzan_number -= 1
    result["message_dianzan_number"] = message_dianzan_number
    cr.close()
    return result

@bottle.route('/pinglun_receive', method = 'POST') #发布新的评论过来时执行的函数
def pinglun_receive():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'  
    pinglun_username = unicode(request.POST.get('pinglun_username'), "utf8")  
    pinglun_message_id = unicode(request.POST.get('pinglun_message_id'), "utf8") 
    shuxei_pinglun_content = unicode(request.POST.get('shuxei_pinglun_content'), "utf8")    
    pinglun_time = unicode(request.POST.get('pinglun_time'), "utf8") 
    print pinglun_username,pinglun_message_id,shuxei_pinglun_content,pinglun_time
    cr=db.cursor()
    cr.execute("INSERT INTO pinglun (message_id,pinglun_username,pinglun_content,pinglun_time) VALUES \
    (%s,%s,%s,%s)",(pinglun_message_id,pinglun_username,shuxei_pinglun_content,pinglun_time))
    db.commit()
    cr.close()
    result = {}
    result["success"] = True
    return result

@bottle.route('/pinglun_return', method = 'POST') #返回用户请求查看的评论信息
def pinglun_return():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'  
    pinglun_message_id = unicode(request.POST.get('pinglun_message_id'), "utf8")
    result = {}
    result["pinglun"] = []
    cr = db.cursor()
    cr.execute("SELECT pinglun_username,pinglun_content,pinglun_time FROM pinglun WHERE message_id = %s",(pinglun_message_id))
    pingluns = cr.fetchall()
    for i in pingluns:
        cr.execute("SELECT selected_head_pic_src FROM user_information WHERE userid = %s",(i[0]))
        head_pic = cr.fetchall()[0][0]
        a_pinglun = {}
        a_pinglun["username"] = i[0]
        a_pinglun["content"] = i[1]
        a_pinglun["time"] = i[2]
        a_pinglun["head_pic"] = head_pic
        result["pinglun"].append(a_pinglun)
    cr.close()
    print result
    return result
    
    
bottle.run(host="127.0.0.1",port=8080)
