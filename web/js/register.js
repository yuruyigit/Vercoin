$(function(){

  var SUBMIT = $("#registerSubmit"),
      CODEBTN = $("#getCode");
      NEWCODEBTN=$('#getNewCode');
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
    CODEBTN.sendCode({
        cell: $("#cell").val(),
        countriesId: $("#countriesId").val()
    });
    if($(this).attr('data-sendin')==0){
        NEWCODEBTN.sendCode({
            cell: $("#cell").val(),
            countriesId: $("#countriesId").val()
        });
    }
});


