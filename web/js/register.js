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
var VcodeButton = {
    initialize:function(){
        // hard code input id
        this.cellInputId = "cell";
        this.intervalId = null;
        this.count = 0;
        this._registEvent();
    },
    setCellInputId:function(eid){
        this.cellElmId = eid;
    },
    _registEvent:function(){
        $("#i_vcode_button").off("click", this._startCount).on("click", {ctx:this}, this._startCount);
    },
    _startCount:function(e){
        e.preventDefault();
        var me = e.data.ctx;
        if(!me._sendVcode()){
            return false;
        }
        me.count = 60;
        $("#i_vcode_button").off("click", me._startCount);
        $("#i_vcode_button").addClass("vcode-btn-disable");
        if(me.intervalId) {
            clearInterval(me.intervalId);
        }
        me.intervalId = setInterval(function() {
            me.count--;
            if(me.count == 0){
                $("#i_vcode_button").on("click", {ctx:me}, me._startCount);
                $("#i_vcode_button").removeClass("vcode-btn-disable");
                clearInterval(me.intervalId);
            }
            me._updateBtnLabel(me.count);
        }, 1000);
    },
    _updateBtnLabel:function(count){
        if(count!=0){
            $("#i_vcode_button").text("重新获取验证码（" + count + "秒）");
        }else{
            $("#i_vcode_button").text("获取验证码");
        }
    },
    _sendVcode:function(){
        var cell = $("input#"+this.cellInputId).val();
        if(!validate.isMobile(cell)){
            alert("请先输入正确的手机号码");
            return false;
        }
        $.get('/vcode/cell/'+cell, function(data){
        });
        return true;
    }
};

$(function(){
    VcodeButton.initialize();
});