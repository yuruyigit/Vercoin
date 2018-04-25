$(function(){
  
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