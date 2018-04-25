$(function(){
  $(".coin_list").on("click",".coin",function(){
    $(this).addClass("coin_active").siblings().removeClass("coin_active")
    $(".coin_content").hide()
    $("."+$(this).attr("data-target")).show()
  });
  
  $(".record_list  li").on("click", function(){
    $(this).addClass("record_active").siblings().removeClass("record_active")
      $(".records_data").hide();
    $("."+$(this).attr("data-target")).show()
  });
})