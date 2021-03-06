/**
 * @close the modal
 */
$("#cancel").on("click", function () {
  $('.common-modal').css("display", "none");
  $('.common-mask').css({
    position: 'relative',
    background: 'rgba(48,48,48,1)'
  })
});

/**
 * @click the button upload the qrcode
 */
$("#changeQR").on("click", function () {
  //e.preventDefault();
  console.log(1111)
  $("#i_pic_file").click();
  $(".common-error-text").eq(3).hide()
});

/**
 * @check and submit the form
 */
$(".submit").on("click", function () {
  var name = $("#realName"),
    pay = $("#payment"),
    pass = $("#fundPassword"),
    file = $("#i_pic_file");
  var valid = 1;
  var errors = $(".common-error-text");

  function e(index, text) {
    errors.eq(index).text(text).show();
    valid = 0;
  }

  if (name.val()) {
    if (name.val().length < 2 || name.val().length > 20) {
      e(0, "姓名长度为（2-20）之间");
    }
  } else {
    e(0, "真实姓名不能为空");
  }

  if (pay.val()) {
    //todo
  } else {
    e(1, pay.prev("label").text() + "不能为空");
  }

  if (pass.val()) {
    if(pass.val().length > 20 || pass.val().length < 6){
          e(2, "交易密码不正确");
     }
  } else {
    e(2, "交易密码不正确");
  }

  // if (file[0].files.length) {
  //   var allowdTypes = ["image/jpeg", 'image/jpg', 'image/png']
  //   if (allowdTypes.indexOf(file[0].files[0].type) === -1) {
  //     e(3, "请选择正确格式的图片");
  //   }
  // } else {
  //   e(3, "二维码图片不能为空");
  // }


  if (valid) $("form").submit()

});


/**
 *@upload the qrcode
 */
$("input#i_pic_file").on("change", function () {

  var iPicFile = $("input#i_pic_file")[0].files[0];
  var type = $("input#type").val();
  if (iPicFile) {
    var fd = new FormData();
    fd.append("file", iPicFile);
    fd.append("type", type);
    $.ajax({
      url: "/my/account/payment/upload",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
      success: function (data) {
        console.log(data)
        if (data != null && data.code == "10000") {
          var img = $("#i_img_container_Id").val() + data.uploadImg;
          $("input#uploadImg").val(data.uploadImg);
          $("#i_img_container").attr("src", img);
          // $("#uploadImgHidden,.qrcode").hide();
          $("#qrcodeUpload").hide();
          $("#qrcodeShow").show();
          $("#i_pic_file").val("");
        }
      },
      error: function (jqXHR, textStatus, errorMessage) {
        console.log("图片上传失败！错误：" + textStatus + ", " + errorMessage);
        if(errorMessage.indexOf("Too Large") > -1){
          alert("上传图片尺寸太大")
        }
      }
    });
  }
});

