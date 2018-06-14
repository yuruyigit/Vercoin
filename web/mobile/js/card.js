/**
 * @close the modal
 */
;$("#cancel").on("tap", function () {
  $('#accountModal').css("display", "none");
  $('.common-mask').css({
    position: 'relative',
    background: 'rgba(48,48,48,1)'
  })
});


/**
 * @check before submit the form
 */
$(".submit").on("tap", function () {

  var name = $("#realName"),
      bank = $("#bankName"),
      branch = $("#bankBranch"),
      card = $("#cardNo"),
      pass = $("#fundPassword");

  var valid = 1;
  var errors = $(".common-error-text");

  function e(index,text){
    errors.eq(index).text(text).show();
    valid = 0;
  }
  //
  if(name.val()){
    if(name.val().length < 2 || name.val().length > 20 ){
      e(0,"姓名长度为（2-20）之间");
    }
  } else {
    e(0,"真实姓名不能为空");
  }

  if(bank.val()){
    //todo
  }else {
    e(1,"开户银行不能为空");
  }

  if(branch.val()){
    //todo
  }else {
    e(2,"开户支行不能为空");
  }

  if(card.val()){
    //todo
  }else {
    e(3,"银行卡号不能为空");
  }

  if(pass.val()){
   // todo
  }else {
    e(4,"交易密码不能为空");
  }


  if(valid) $("form").submit()
});