
$(".common-radio").on("click", function(){
   var index = $(this).index()/2;
  $(".real-radio").eq(index).find("input").click()
});


/**
 *@desc show the input line for eth & btc
 */
$(".check-coin").on("tap",function(){
  var checked = $(this).hasClass("checked");
  $( "."+ $(this).attr("target-name") ).css("display",checked ? "flex": 'none');
});

$(".common-input").on("focus",function(){
  $(this).parent().removeClass("common-input-error")
})


$(".submit").on("tap", function () {

  var pass = 1;
  // get the dom array
  var doms = [$("#price1")], coins = $(".check-coin");
  if(coins.eq(0).hasClass("checked")) doms.push($("#price2"))
  if(coins.eq(1).hasClass("checked")) doms.push($("#price3"))
  doms = doms.concat([$("#amount"),$("#time"),$("#min"),$("#max")]);

  //
  doms.forEach(function(item,index){
    var dom = $(item);
    if(dom.val()){
      // not empty

    }else {
      // if empty
      dom.parent().addClass("common-input-error");
      pass = 0;
    }
  })
  if(pass) $(".form").submit();
})
