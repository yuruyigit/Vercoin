$.fn.sendCode = function (option) {
  var t = $(this);
  var defaults = {
    time: 120,
    api: '/sendSms',
    cell: '',
    countriesId: '',
    sendingClass: 'code_sending',
	email:''
  };
  var options = $.extend(defaults, option);
  t.attr("data-sending", '0');
  t.on("click", function (e) {
    e.preventDefault();
    // sending return
    if (t.attr("data-sending") === '1') {
      return false;
    } 
    var config = {
      method: "post",
      url: options.api,
      data: {
    "cell": options.cell,
    "countriesId": options.countriesId,
	"email":options.email
  },
      success: function (data, status, xhr) {
        console.log(data)
        console.log(status)
        console.log(xhr)
        t.attr("data-sending", '1').addClass(options.sendingClass);
        var time = options.time;
        var renderText = setInterval(function () {
          if (time) {
            t.text(--time + "s后再次获取")
          } else {
            window.clearInterval(renderText);
            t.attr("data-sending", '0').
            text("发送验证码").removeClass("code_sending")
          }
        }, 1000)

      },
      error: function (data, status, xhr) {
        console.log(data)
        console.log(status)
        console.log(xhr)
      }
    }
    $.ajax(config);
  })
}

/**
 * @更好的解决方案
 * @param config a object
 * @param config.btn
 * @param config.input
 * @param config.email
 * @param config.api
 * @param config.country
 */
window.GETCODE = function(config){

      // 手机正则
  var regCell = /^\d{8,}$/,
      // 邮箱正则
      regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ,
      // 页面地址
      address = $("form").attr("action"),
      // 点击的按钮
      button = config.btn,
      // 数据来源
      input = config.input;
  input.on("focus", function(){
    $(this).parent().next("span.error_text").remove()
  });
  button.on("click",function(e){
    e.preventDefault();
    if( $(this).attr("data-sending") === '1'){
      return false;
    }
    if(!input.val()){
      return false;
    }
    if(config.email){
      if(!regEmail.test(input.val())){
        console.log("email error")
        return false;
      }
    }else {
      if(!regCell.test(input.val())){
        console.log("cell error")
        return false;
      }
    }
    var datas = {}
    if(config.email){
      datas.email = input.val();
    }else {
      datas.cell = input.val();
      datas.countriesId = config.country.val();
    }
    $.ajax({
      method: "post",
      url: config.api + address,
      data: datas,
      success: function (data, status, xhr) {
        if(data.code === "10000"){
          button.attr("data-sending", '1').
          addClass("code_sending");
          var time = 120;
          var renderText = setInterval(function () {
            if (time) {
              button.text(--time + "s后再次获取")
            } else {
              window.clearInterval(renderText);
              button.attr("data-sending", '0').
              text("发送验证码").removeClass("code_sending")
            }
          }, 1000)
        }
        if(data.code === "99998"){
          var notice, isReg = (address  === "/register");
          notice = '<span class="error_text"></span>';
          $(notice).text('手机号'+ (isReg ? '已': '未') + '注册');
          input.parent().after($(notice));
        }
      },
      error: function (data, status, xhr) {
        alert("获取验证码失败，请稍后再试")
      }
    });
  })

}