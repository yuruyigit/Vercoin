$.fn.sendCode = function (option) {
  var t = $(this);
  var defaults = {
    time: 120,
    api: '/sendSms',
    cell: '',
    countriesId: '',
    sendingClass: 'code_sending'
  };
  var options = $.extend(defaults, option);
  t.attr("data-sending", '0');
  t.on("click", function (e) {
    e.preventDefault();
    // sending return
    if (t.attr("data-sending") === '1') {
      return false;
    }
    var sdata = {}
    if (option.email) {
      sdata = {
        email: option.email
      }
    } else {
      sdata = {
        "cell": options.cell,
        "countriesId": options.countriesId
      }
    }
    var config = {
      method: "post",
      url: options.api,
      data: sdata,
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
            t.attr("data-sending", '0').text("发送验证码").removeClass("code_sending")
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
 * @param config
 * @constructor
 */
window.GETCODE = function(config){
  var defaults = {
    btn: '',
    input: '',
    email: false,
    api: '',
    country: ''
  };
  var regCell = /^\d{8,}$/;
  var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  // check the input
  config.btn.on("click",function(e){
    e.preventDefault()
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
      datas.cell = config.input.val()
      datas.countriesId = config.country.val()
    }
    $.ajax({
      method: "post",
      url: config.api,
      data: datas,
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
            t.attr("data-sending", '0').text("发送验证码").removeClass("code_sending")
          }
        }, 1000)
      },
      error: function (data, status, xhr) {
        console.log(data)
        console.log(status)
        console.log(xhr)
      }
    });


  })

}