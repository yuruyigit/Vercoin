var me_id = $("#me_id").val();
var target_id = $("#target_id").val();
var order_id = $("#order_id").val();

var me_photo=$("#me_photo").val();
var target_photo=$("#target_photo").val();
var me_name=$("#me_name").val();
var target_name=$("#target_name").val();
var ipAddress=$("#ipAddress").val();

/**
 * @格式化时间
 */
function crtTimeFtt(value, row, index) {
  var crtTime = new Date(value);

  function dateFtt(fmt, date) { //author: meizz
    var o = {
      "M+": date.getMonth() + 1,                 //月份
      "d+": date.getDate(),                    //日
      "h+": date.getHours(),                   //小时
      "m+": date.getMinutes(),                 //分
      "s+": date.getSeconds(),                 //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

  return dateFtt("yyyy-MM-dd hh:mm:ss", crtTime);
}
var query = {},
  userName, // 我的id
  target,    //对方的id
  $$,    // socket
  chat = 'chatevent',
  SENDBTN = $(".chat_send"), //发送按钮
  FILE = $("#upload"), // 上传图片的
  USERTEXT = $("#userMessage"), //文本框
  ISIE = navigator.userAgent.indexOf("compatible") > -1 &&
    navigator.userAgent.indexOf("MSIE") > -1;
/**
 * @获取聊天双方的id
 */
query['me']=me_id+"_"+order_id;
query['target']=target_id+"_"+order_id;

userName = query['me'], target = query['target'];

if("undefined" == typeof io){
  io = {}
  io.connect = function(){}
  io.on = function(){}
  io.emit = function(){}
}

/**
 * @init socket服务器
 */
$$ = io.connect('http://'+ipAddress+':9092');
/**
 * @连接上socket服务器
 */
$$.on('connect', function () {
  console.log("connect");

});
/**
 * @正常的聊天
 */
$$.on(chat, function (data) {
  console.log("信息来了呀")
  console.log(data)
  renderLine(data)
});
/**
 * @断开连接
 */
$$.on('disconnect', function () {
  console.log("disconnect")
});

/**
 * @TODO
 */
// $$.disconnect(); 主动断开连接

/**
 * @点击发送按钮
 */
SENDBTN.on("click", function () {
  console.log(1111)
  var file = FILE[0].files[0],
    pattern = /(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.gif$)|(\.*.bmp$)/;
  // 有图片先发送图片
  if (file) {
    // 不是图片不行
    if (!pattern.test(FILE[0].value)) {
      alert("请上传jpg/jpeg/png/gif/bmp格式的照片！");
      FILE[0].value = '';
      return false;
    }
    if (ISIE) {
      var realPath, xmlHttp, xml_dom, tmpNode, imgBase64Data;
      realPath = FILE[0].value;
      xmlHttp = new ActiveXObject("MSXML2.XMLHTTP");
      xmlHttp.open("POST", realPath, false);
      xmlHttp.send("");
      xml_dom = new ActiveXObject("MSXML2.DOMDocument");
      tmpNode = xml_dom.createElement("tmpNode");
      tmpNode.dataType = "bin.base64";
      tmpNode.nodeTypedValue = xmlHttp.responseBody;
      imgBase64Data = "data:image/bmp;base64," + tmpNode.text.replace(/\n/g, "");
      var data = {
        userName: userName,
        message: '',
        stamp: new Date().getTime(),
        image: imgBase64Data // base64字符串
      };
      $$.emit('chat', data);
      FILE[0].value = ''
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        var data = {
          userName: userName,
          message: '',
          stamp: new Date().getTime(),
          image: this.result // base64字符串
        };
        $$.emit(chat, data);
        FILE[0].value = ''
      }
    }
  }
  // 发送文本
  if (USERTEXT.val()) {
    $$.emit(chat,
      {
        userName: userName,
        message: USERTEXT.val(),
        image: '',
        stamp: new Date().getTime()
      }
    );
    USERTEXT.val('');
  }
})


/**
 * @渲染单条信息
 */
function renderLine(data) {
  if(data.system){
    renderSys(data);
    return false;
  }
  //只会渲染自己和对方的聊天
  var isMe = data.userName === userName,isHe = data.userName === target;
  console.log(isMe)
  console.log(isHe)
  if ( isMe || isHe ) {
    var template = '<div class="clearfix">\n' +
      '                        <div class="user">\n' +
      '                            <div class="avatar">\n' +
      '                                <img src="./images/avatar_f_1.png" class="mCS_img_loaded">\n' +
      '                                <span class="user-status online"></span>\n' +
      '                            </div>\n' +
      '                            <div class="username"><a href="#">nuoee</a></div>\n' +
      '                            <div class="content-info">\n' +
      '                                <time datetime="2018-04-26 11:37:04">' +
      '                                   2018-04-26 11:37:04</time>\n' +
      '                            </div>\n' +
      '                        </div>\n' +
      '                        <div class="content-box">\n' +
      '                            <div class="content-body">\n' +
      '                                <div class="content-text"></div>\n' +
      '                                <div class="content-read">已读</div>\n' +
      '                            </div>\n' +
      '                        </div>\n' +
      '                    </div>';
    var n = $(template);
    n.addClass(isMe?'me':'system');
    // 设置用户名和头像
    n.find(".avatar img").attr("src", isMe ? me_photo : target_photo);
    n.find(".username a").text(isMe ? me_name : target_name);

    if (data.message) {//消息实体
      n.find(".content-text").text(data.message)
    } else {
      n.find(".content-text").html('<img src="" alt="" />');
      n.find(".content-text img").attr("src",data.image)
    }
    if(isHe){
      n.find(".content-read").hide()
    }
    n.find("time").text(crtTimeFtt(data.stamp));
    $(".mCSB_container").append(n)
  }
}

/**
 * @渲染系统消息
 */
function renderSys(data){
  var template = '<div class="system_message">' +
    '                        <div class="title"></div>' +
    '                        <div class="detail"></div>' +
    '                        <div class="date"></div>' +
    '                    </div>';
  var n = $(template),
      title = data.system.split("-")[0],
      content = data.system.split("-")[1];
  n.find(".title").text(title).end().
    find(".detail").text(content).end().
    find(".date").text(crtTimeFtt(data.stamp)).end();
  $(".mCSB_container").append(n)
}
$(".chat_contents").mCustomScrollbar({
    setHeight: 498,
    theme: "minimal-dark" // theme:"minimal-dark"  "inset-2-dark" dark-3
});
