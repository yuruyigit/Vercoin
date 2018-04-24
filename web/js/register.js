;$(function(){
  
  var COUNTRYLIST = $("#countryList"),
      SUBMIT = $("#registerSubmit"),
      CODEBTN = $("#getCode");
  
  var SENDING = 0;
  // function renderCountryList(list,target){
  //   var x = 0, len = list.length;
  //   for(; x<len;x++){
  //     var country_data = list[x].split("-"),
  //     _frags = $("<div class='country'></div>");
  //     _frags.attr("data-code",country_data[2]).text(country_data[1])
  //     target.append(_frags)
  //   }
  // }
  // setTimeout(function(){
  //   renderCountryList(country_list,COUNTRYLIST)
  // })

  
  COUNTRYLIST.on('click','.country',function(){
    $("#country").val($(this).text())
    COUNTRYLIST.hide()
  })
  
  
  // /**
  //  * @toggle country list
  //  */
  // $(".select_country").on("click",function(){
  //   COUNTRYLIST.slideToggle();
  // })
  
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
    e.preventDefault();
    if(SENDING) return;
    if($("#phone").val().length < 10){
      var text="<div class='form_error'>您的手机号码有误</div>"
      $("#phone").parent().parent().append($(text))
      
      return;
    }
    SENDING = 1;
    var time = 10;
    $(this).addClass("code_sending")
    var renderText = setInterval(function(){
      if(time){
        CODEBTN.text(--time+ "s后再次获取" )
      }else {
        window.clearInterval(renderText);
        SENDING = 0 ;
        CODEBTN.text("重新获取验证码").removeClass("code_sending")
      }
    },1000)
  })
  
  
  //
  // SUBMIT.on("click",function(e){
  //   e.preventDefault();
  //   console.log($("#check").is(':checked'))
  // })
  
  
  
  
});