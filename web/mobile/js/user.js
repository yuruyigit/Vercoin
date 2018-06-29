/**
 * @desc 自定义路由 切换个人信息列表和个人信息tab
 */

$("#confirm1").on("click", function(){
  $("#modal-asset").hide()
  $(".common-mask").css({
    "position": 'relative',
    "background": 'rgba(48,48,48,1)'
  })
});

$("#closeFundModal").on("click", function(){
  $("#modal1").hide()
  $(".common-mask").css({
    "position": 'relative',
    "background": 'rgba(48,48,48,1)'
  })
});

$(".show-bill").on("click", function(e){
  e.preventDefault();
  if($("#modal-asset").length){
    return;
  }
  if($("#modal1").length){
   return;
  }
  window.location = $(this).attr("href")
});

$(".operate").on("click",function(e){
  e.preventDefault();
  if($("#modal-asset").length){
    $("#modal-asset").show()
    $('.common-mask').css({position: 'fixed', background: 'rgba(48,48,48,0.30)'})
    return;
  }
  if($("#modal1").length){
    $("#modal1").show()
    $('.common-mask').css({position: 'fixed', background: 'rgba(48,48,48,0.30)'})
    return;
  }
  window.location = $(this).attr("href")
});

function loadRouter(){
  if (window.location.href.indexOf("#") > -1) {
    var router = window.location.href.split("#")[1];
    var routers = {
      infoDetail: 1 ,
      assets: 2,
      bill: 3
    };
    $("header").hide();
    $("header").eq(routers[router]).show();
    if(router === 'infoDetail'){
      $("#myAssets").hide();
      $("#infoTabs").hide();
      $("#infoDetail").show();
    }
    if(router === 'bill'){
      $("#myAssets").hide();
      $("#infoTabs").hide();
      $("form").hide()
    }
    else {
      // 进入我的资产页面

      // check用户有没有设置资金密码和实名
      // if($("#modal-asset").length){
      //   $("#modal-asset").show()
      //   $('.common-mask').css({position: 'fixed', background: 'rgba(48,48,48,0.30)'})
      // }
      // if($("#modal1").length){
      //   $("#modal1").show()
      //   $('.common-mask').css({position: 'fixed', background: 'rgba(48,48,48,0.30)'})
      // }

      $("#myAssets").show();
      $("#infoTabs").hide();
      $("#infoDetail").hide();
      $("form").hide();
    }

    $("footer").hide();

  } else {
    $("form").show();
    $("#infoTabs").show();
    $("#infoDetail").hide();
    $("#myAssets").hide();
    $("footer").show();
    $("header").hide();
    $("header").eq(0).show();
  }
}

// 修复用户修改完数据调到上一级页面
if(localStorage.mbchangeuser){
  window.location = window.location.href + "#infoDetail"
  localStorage.removeItem("mbchangeuser");
}else {
  loadRouter();
}

window.addEventListener("hashchange", function () {
  loadRouter();
}, false);


/**
 * @点击退出
 */
$(".logout").on("click", function () {
  $('#modal').css({"display": "block"});
  $('.common-mask').css({position: 'fixed', background: 'rgba(48,48,48,0.30)'})
});

$(".logout-btn").on("click", function () {
  $('#modal').css({"display": "none"});
  $('.common-mask').css({position: 'relative', background: 'rgba(48,48,48,1)'})
  if ($(this).attr("id") === 'modalConfirm') {
    window.location = "/logout/success"
  }
});


/**
 * @desc 用户选择头像
 */
// change avatar
$("#avatar").on("click", function () {
  $('#userModal').css({"display": "block"});
  $('.common-mask').css({position: 'fixed', background: 'rgba(48,48,48,0.30)'})
});

// select user avatar
$(".user-list").on("click",function () {
  var src = $(this).find("img").attr("src");
  //$("#avatar img").attr("src", src);
  $("#profile").val(src.split("web/")[1]);
  $(this).toggleClass('active').siblings().removeClass('active');
  $(this).find("span").toggleClass("active");
  $(this).siblings().find("span").removeClass('active');
});


$(".avatar-btn").on("click", function () {
  $('#userModal').css({"display": "none"});
  $('.common-mask').css({position: 'relative', background: 'rgba(48,48,48,1)'});
  if ($(this).attr("id") === "userModalConfirm") {
    //todo then change the avatar
    $("#userForm").submit();
    localStorage.mbchangeuser = 1;
  }
});


/**
 * @用户编辑简介
 */
function sumModal(dis,pos){
  $('#summary-modal').css("display", dis);
  $('.common-mask').css({position: pos, background: 'rgba(48,48,48,0.30)'})
}

$("#editSummary").click(function () {
  sumModal("block","fixed")
});

$("#save").click(function () {
  sumModal("none","relative");
  $("#introduce").val($("#introduceInput").val());
  $("#userForm").submit();
  localStorage.mbchangeuser = 1;
});

$("#cancel").click(function () {
  sumModal("none","relative")
});


