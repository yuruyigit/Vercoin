;$(function(){

  var SUBMIT = $("#registerSubmit"),
      CODEBTN = $("#getCode");

  var SENDING = 0;

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
    if(SENDING) return;
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
        SENDING = 1;
        var time = 120;
        $(this).addClass("code_sending")
        var renderText = setInterval(function(){
            if(time){
                CODEBTN.text(--time+ "s后再次获取" )
            }else {
                window.clearInterval(renderText);
                SENDING = 0 ;
                CODEBTN.text("发送验证码").removeClass("code_sending")
            }
        },1000)
      console.log(res)
    },function(res){
      console.log("发送失败")
    });



  });

  
  

  
  
  
});