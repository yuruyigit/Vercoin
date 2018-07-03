$(function () {
  /**
   * @dec get the vcode
   */
  var btn = $("#sendCode");
  btn.on("click", function (e) {
    e.preventDefault();
    if ($(this).attr("data-sending") === '1') {
      return false;
    }
    var regCell = /^\d{6,20}$/;
    var cell = $("#cell");
    if (cell.val()) {
      if (!regCell.test(cell.val())) {
        $(".common-error-text").eq(1).text("请输入正确的手机号").show()
        return false;
      }
    } else {
      $(".common-error-text").eq(1).text("手机号不可为空").show()
      return false;
    }
    var datas = {}
    datas.cell = cell.val();
    datas.countriesId = $("#countriesId").val();
    $.ajax({
      method: "post",
      url: "/sendSms/register",
      data: datas,
      success: function (data, status, xhr) {
        if(parseInt(data.code) === 10000){
          btn.attr("data-sending", '1').addClass("code_sending");
          var time = 120;
          var renderText = setInterval(function () {
            if (time) {
              btn.text(--time + "s后再次获取")
            } else {
              window.clearInterval(renderText);
              btn.attr("data-sending", '0').text("发送验证码").removeClass("code_sending")
            }
          }, 1000)
        }
        if (parseInt(data.code) === 99998){
          $(".common-error-text").eq(1).text("手机号码已注册").show()
        }
      },
      error: function (data, status, xhr) {
        alert("获取验证码失败，请稍后再试")
      }
    });
  });



  /**
   * @desc submit the form
   */
  $(".submit").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("common-btn-disabled")) return false;

    // define args
    var pass = 1;
    var regxCode = /^\d{6}$/;
    var regxCell = /^\d{6,20}$/; // todo
    var regxChina = /^1[34578]\d{9}$/;
    var doms = [
      $("#username"), $("#cell"), $("#vcode"), $("#passwordPlain"), $("#rePasswordPlain")
    ];

    var tips = [
      "用户名不可为空", '手机号不可为空', "验证码不可为空", "密码不可为空", "请再次输入密码"
    ];

    // show error inner func
    function err(dom, text, isParent) {
      var ele = isParent ? dom.parent() : dom;
      ele.addClass("common-input-bottom-error").next(".common-error-text").text(text).show();
      pass = 0;
    }

    // check if empty
    doms.forEach(function (dom, index) {
      if (!dom.val()) {
        err(dom, tips[index], dom.parent().hasClass("common-input-item-label"));
      } else {
        if (index === 0) {
          if (dom.val().length < 2 || dom.val().length > 20) {
            err(dom, "用户名长度为2到20位之间");
          }
        }

        if (index === 1) {
          if (!regxCell.test(dom.val())) {
            err(dom, "请输入正确的手机号", 1);
          }
          if(parseInt($("#countriesId").val()) === 1){
            if (!regxChina.test(dom.val())) {
              err(dom, "请输入正确的手机号", 1);
            }
          }
        }
        if (index === 2) {
          if (!regxCode.test(dom.val())) {
            err(dom, "验证码为6位数字", 1);
          }

        }
        if (index >= 3) {
          if (dom.val().length < 6 || dom.val().length > 20) {
            err(dom, "密码长度为6-20之间");
          } else {
            if (index === 4) {
              if (doms[3].val() !== dom.val()) {
                err(dom, "两次输入密码不一致");
              }
            }
          }
        }
      }
    });
    // submit the form
    if (pass) {
      $("form").submit();
    }
  });


});