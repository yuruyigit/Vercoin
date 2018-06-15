/**
 * @name send the vcode
 * @param config
 * @constructor
 */
window.GETCODE = function (config) {

  var regCell = /^\d{8,}$/, // 手机正则
    // 邮箱正则
    regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    // 页面地址
    addr = $("form").attr("action"),
    address = (addr.indexOf("reg") > -1) ? addr : '/forgot',
    // 点击的按钮
    button = config.btn,
    // 数据来源
    input = config.input;
  input.on("focus", function () {
    $(this).parent().next("span.error_text").remove()
  });
  button.on("tap", function (e) {
    e.preventDefault();
    if ($(this).attr("data-sending") === '1') return;
    if (!input.val()) return;

    if (config.email) {
      if (!regEmail.test(input.val())) {
        console.log("email error")
        return false;
      }
    } else {
      if (!regCell.test(input.val())) {
        console.log("cell error")
        return false;
      }
    }
    var datas = {}
    if (config.email) {
      datas.email = input.val();
    } else {
      datas.cell = input.val();
      datas.countriesId = config.country.val();
    }
    $.ajax({
      method: "post",
      url: config.api + address,
      data: datas,
      success: function (data, status, xhr) {
        if (data.code === "10000") {
          button.attr("data-sending", '1').addClass("code_sending");
          var time = 120;
          var renderText = setInterval(function () {
            if (time) {
              button.text(--time + "s后再次获取")
            } else {
              window.clearInterval(renderText);
              button.attr("data-sending", '0').text("发送验证码").removeClass("code_sending")
            }
          }, 1000)
        }
        if (data.code === "99998") {
          var notice, isReg = (address === "/register");
          notice = '<span class="error_text"></span>';
          var dom = $(notice);
          dom.text('手机号' + (isReg ? '已' : '未') + '注册');
          input.parent().after(dom);
        }
      },
      error: function (data, status, xhr) {
        alert("获取验证码失败，请稍后再试")
      }
    });
  })
};

window.onload = function() {
/**
 * @description prev page
 */
$(".common-header-left").on("tap", function () {
  window.history.go(-1);
});

/**
 * @description checkbox
 */
$(".common-checkbox").on("tap", function () {
  var t = $(this);
  if(t.hasClass("fix")) return;
  var target = t.data("target") ? $("." + t.data("target")) : '';
  var checked = t.hasClass("checked");
  var src = t.find("img").attr("src"),dsrc;
  if(checked){
    dsrc = src.replace("checkbox1","checkbox")
  }else {
    dsrc = src.replace("checkbox","checkbox1")
  }
  t.toggleClass("checked").find("img").attr("src", dsrc);
  // if the user license
  if (target) target.toggleClass("common-btn-disabled").toggleClass(target.data("class"));
});


/**
 * @description the  custom radio
 */
$(".common-radio").on("tap", function () {
  $(this).addClass("selected").siblings(".common-radio").removeClass("selected");
});


/**
 * @description the custom tabs
 */
$(".common-tab").on("tap", "li", function () {
  $(".common-tab li").removeClass("active");
  $(this).addClass("active");
});


/** todo
 * @description input focus hide the error tip
 */
$(".common-input-item input").on("focus" ,function(){
  $(this).removeClass("common-input-bottom-error").siblings(".common-error-text").hide();
  $(this).parent().removeClass("common-input-bottom-error").next(".common-error-text").hide();

  $(this).removeClass("common-input-error").siblings(".error-text").hide();
  $(this).parent().removeClass("common-input-error").next(".error-text").hide();
});

};


