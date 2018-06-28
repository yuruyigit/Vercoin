$(function () {
  /**
   * @dec get the vcode
   */
  window.GETCODE({
    btn: $("#sendCode"),
    input: $("#cell"),
    api: '/sendSms',
    country: $("#countriesId")
  });

  /**
   * @desc submit the form
   */
  $(".submit").on("tap", function () {
    if ($(this).hasClass("common-btn-disabled")) return false;

    // define args
    var pass = 1;
    var regxCode = /^\d{6}$/;
    var regxCell = /^\d{6,20}$/; // todo
    var regxChina = /^1[34578]\d{9}$/;
    var doms = [
      $("#user"), $("#cell"), $("#code"), $("#pass"), $("#repass")
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
      console.log("pass")
      $("form").submit();
    }
  });


});