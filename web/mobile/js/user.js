
if(window.location.href.indexOf("#") > -1){
    $("header").hide();
    $("header").eq(1).show();
    $("#infoTabs").hide();
    $("#infoDetail").show();
    $("footer").hide();
}else {
    // default details hide
    $("#infoTabs").show();
    $("#infoDetail").hide();
    $("footer").show();
    $("header").hide();
    $("header").eq(0).show();
}

window.addEventListener("hashchange", function () {
    console.log("change")
    console.log(window.location.href)
    if(window.location.href.indexOf("#") > -1){
        $("header").hide();
        $("header").eq(1).show();
        $("#infoTabs").hide();
        $("#infoDetail").show();
        $("footer").hide();
    }else {
        //  to index 
        $("header").hide();
        $("header").eq(0).show();
        $("footer").show();
        $("#infoTabs").show();
        $("#infoDetail").hide();
    }

}, false);


// show modal when logout
$(".logout").on("click",function () {
    $('#modal').css({"display":"block"});
    $('.common-mask').css({position:'fixed',background:'rgba(48,48,48,0.30)'})
});

$(".logout-btn").on("click",function(){
    $('#modal').css({"display":"none"});
    $('.common-mask').css({position:'relative',background:'rgba(48,48,48,1)'})
    if($(this).attr("id") === 'modalConfirm'){
        window.location="/logout/success"
    }
});

// change avatar
$("#avatar").click(function () {
    $('#userModal').css({"display":"block"});
    $('.common-mask').css({position:'fixed',background:'rgba(48,48,48,0.30)'})
})


// select user avatar
$(".user-list").click(function () {
    var img = $(this).find("img").attr("src");
    $("#avatar img").attr("src",img);
    $(this).toggleClass('active');
    $(this).siblings().removeClass('active');
    $(this).find("span").toggleClass("active");
    $(this).siblings().find("span").removeClass('active');
});


$(".avatar-btn").on("click",function(){
    $('#userModal').css({"display":"none"});
    $('.common-mask').css({position:'relative',background:'rgba(48,48,48,1)'});
    if($(this).attr("id") === "userModalConfirm"){
        //todo then change the avatar
        $("#avatarForm").submit();
    }
})


$("#editSummary").click(function () {
    $('#summary-modal').css("display","block");
    $('.common-mask').css({position:'fixed',background:'rgba(48,48,48,0.30)'})
})
$("#save").click(function () {
   $('#summary-modal').css("display","none");
   $('.common-mask').css({position:'relative',background:'rgba(48,48,48,0.30)'})
})
$("#cancel").click(function () {
    $('#summary-modal').css("display","none");
    $('.common-mask').css({position:'relative',background:'rgba(48,48,48,0.30)'})
})


