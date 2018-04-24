$(function(){
  
  $(".content_title_list").on("click",function(){
      $(this).toggleClass("content_title_list_active").
      siblings().toggleClass("content_title_list_active");
      $(".content_list").hide()
      $("." + $(this).attr("data-child")).show();
  })







})