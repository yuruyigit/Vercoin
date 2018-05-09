$.fn.sendCode = function (option) {
  var t = $(this);
  var defaults = {
    time: 120,
    api: '/sendSms',
    cell: '',
    countriesId: '',
    sendingClass:'code_sending'
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
        "countriesId": options.countriesId
      }
    }
    $.ajax(config).then(function (res) {
        t.attr("data-sending", '1').addClass(options.sendingClass);
        var time = options.time;
        var renderText = setInterval(function(){
          if(time){
            t.text(--time+ "s后再次获取" )
          }else {
            window.clearInterval(renderText);
            t.attr("data-sending", '0').text("发送验证码").removeClass("code_sending")
          }
        },1000)
      },
      function (res) {
        alert('发送失败')
      }
    )
  })
}