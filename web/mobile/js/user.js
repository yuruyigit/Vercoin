/**
 * @desc 自定义路由 切换个人信息列表和个人信息tab
 */

function loadRouter(){
  if (window.location.href.indexOf("#") > -1) {
    $("header").hide();
    $("header").eq(1).show();
    $("#infoTabs").hide();
    $("#infoDetail").show();
    $("footer").hide();
  } else {
    // default details hide
    $("#infoTabs").show();
    $("#infoDetail").hide();
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
$("#avatar").click(function () {
  $('#userModal').css({"display": "block"});
  $('.common-mask').css({position: 'fixed', background: 'rgba(48,48,48,0.30)'})
});

// select user avatar
$(".user-list").click(function () {
  var src = $(this).find("img").attr("src");
  $("#avatar img").attr("src", src);
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


