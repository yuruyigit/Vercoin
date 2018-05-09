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