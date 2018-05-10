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
  function getTail(){
    var href = window.location.href;
    href = href.substr(10);
    if(href.indexOf("?") > -1){
      href = href.split("?")[0]
    }
    var arr = href.split("/");
    return arr[arr.length-1];
  }

  var regCell = /^\d{8,}$/,
      regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  config.btn.on("click",function(e){
    e.preventDefault();
    if( $(this).attr("data-sending") === '1'){
      return false;
    }
    if(!config.input.val()){
      return false;
    }
    if(config.email){
      if(!regEmail.test( config.input.val())){
        console.log("email error")
        return false;
      }
    }else {
      if(!regCell.test( config.input.val())){
        console.log("cell error")
        return false;
      }
    }
    var datas = {}
    if(config.email){
      datas.email = config.input.val();
    }else {
      datas.cell = config.input.val();
      datas.countriesId = config.country.val();
    }
    $.ajax({
      method: "post",
      url: config.api + '/' + getTail(),
      data: datas,
      success: function (data, status, xhr) {
        if(data.code === "10000"){
          config.btn.attr("data-sending", '1').
          addClass("code_sending");
          var time = 120;
          var renderText = setInterval(function () {
            if (time) {
              config.btn.text(--time + "s后再次获取")
            } else {
              window.clearInterval(renderText);
              config.btn.attr("data-sending", '0').
              text("发送验证码").removeClass("code_sending")
            }
          }, 1000)
        }
      },
      error: function (data, status, xhr) {
        alert("获取验证码失败，请稍后再试")
      }
    });
  })

}