$(function(){
  if(window.location.href.indexOf("?") > -1){
    var arr = window.location.href.split("?"), objs = arr[1].split("&"), obj = {};
    $.each(objs,function(index,item){
      obj[item.split("=")[0]] = item.split("=")[1]
    })
    $(".item_list").removeClass("item_list_active")
    .eq(obj.type === "ONLINEBUY"?0:1).addClass("item_list_active")
    $(".content_title_list").removeClass("content_title_list_active")
      .eq(obj.status === "OPENING"?0:1).addClass("content_title_list_active")
    $(".content_list").hide().eq(obj.status === "OPENING"?0:1).show()
  }
  
  $(".content_title_list").on("click",function(){
      $(this).toggleClass("content_title_list_active").
      siblings().toggleClass("content_title_list_active");
      $(".content_list").hide()
      $("." + $(this).attr("data-child")).show();
  })

  $(".item_list").on("click",function(){
      $(".item_list").removeClass("item_list_active")
      $(this).addClass("item_list_active")
      $(".content").hide()
      $("."+$(this).attr("data-tar")).show()
  })
})