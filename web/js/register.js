;$(function(){

  var SUBMIT = $("#registerSubmit"),
      CODEBTN = $("#getCode"),
      Newcodebtn=$('#getNewCode');
  var SENDING1 = 0;SENDING2=0;

  /**
   * @check if the user agree
   */
  $("#check1").on("click",function(){
    if($(this).is(':checked')){
      SUBMIT.removeAttr("disabled")
    }else {
      SUBMIT.attr("disabled","disabled")
    }
  });
  /***
   * @send the code
   */
  CODEBTN.on("click",function(e){
    //$post("/sendSms", {"cell":cell, "countriesId", countriesId})
    e.preventDefault();
    if(SENDING1) return;
    var conf = {
        method:"post",
        url:"/sendSms",
        data:{
            "cell":$("#cell").val(),
            "countriesId":  $("#countriesId").val()
        }
    }
    $.ajax(conf).then(
    function(res){
        console.log("发送成功")
        SENDING1 = 1;
        var time = 120;
        $(this).addClass("code_sending")
        var renderText = setInterval(function(){
            if(time){
                CODEBTN.text(--time+ "s后再次获取" )
            }else {
                window.clearInterval(renderText);
                SENDING1 = 0 ;
                CODEBTN.text("发送验证码").removeClass("code_sending")
            }
        },1000)
      console.log(res)
    },function(res){
      console.log("发送失败")
    });
  });
  if(SENDING1 = 0){
      Newcodebtn.on('click',function (e) {
          console.log(1111)
          e.preventDefault();
          if(SENDING2) return;
          var conf = {
              method:"post",
              url:"/sendSms",
              data:{
                  "cell":$("#cell").val(),
                  "countriesId":  $("#countriesId").val()
              }
          }
          $.ajax(conf).then(
              function(res){
                  console.log("发送成功")
                  SENDING2 = 1;
                  var time = 120;
                  $(this).addClass("code_sending")
                  var renderText = setInterval(function(){
                      if(time){
                          Newcodebtn.text(--time+ "s后再次获取" )
                      }else {
                          window.clearInterval(renderText);
                          SENDING2 = 0 ;
                          Newcodebtn.text("发送验证码").removeClass("code_sending")
                      }
                  },1000)
                  console.log(res)
              },function(res){
                  console.log("发送失败")
              });
      })
  }

});
