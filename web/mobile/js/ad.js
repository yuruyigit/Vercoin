
$("#main_content").attr("data-page",1);
var isTop = top === window;
var startx, starty;
var total = parseInt($("#totalPage").val());
var type = $("#transactionType").val();
var loc;
if(window.location.href.indexOf("?") > -1){
  loc = window.location.href.split("?")[0]
}else {
  loc = window.location.href
}


window.onload = function(){


  $(".common-trade-right a").on("click", function(e){
    e.preventDefault();
    top.location = $(this).attr("href")
  })

  console.log($(".common-trade-list").height())

  if(isTop){
    //获得角度
    function getAngle(angx, angy) {
      return Math.atan2(angy, angx) * 180 / Math.PI;
    };

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    function getDirection(startx, starty, endx, endy) {
      var angx = endx - startx;
      var angy = endy - starty;
      var result = 0;
      //如果滑动距离太短
      if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
        return result;
      }
      var angle = getAngle(angx, angy);
      if (angle >= -135 && angle <= -45) {
        result = 1;
      } else if (angle > 45 && angle < 135) {
        result = 2;
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
      } else if (angle >= -45 && angle <= 45) {
        result = 4;
      }
      return result;
    }

    document.addEventListener("touchstart", function(e) {
      startx = e.touches[0].pageX;
      starty = e.touches[0].pageY;
    }, false);
//手指离开屏幕
    document.addEventListener("touchend", function(e) {
      var endx, endy;
      endx = e.changedTouches[0].pageX;
      endy = e.changedTouches[0].pageY;
      var direction = getDirection(startx, starty, endx, endy);
      if(direction === 1){
        console.log(total)
        // 如果已经加载的页数小于总的页数，才可加载

        var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
        if(($(document).height()) <= totalheight) {
          //页面到达底部
          console.log("到达底部 ")
        }


        if( parseInt($("#main_content").attr("data-page")) < total){




          var newPage = parseInt($("#main_content").attr("data-page")) + 1;

          var dom = document.createElement("iframe");
          dom.setAttribute("class","data-frame")
          dom.setAttribute("name","innerframe")
          dom.setAttribute("scrolling","no")
          dom.setAttribute("frameborder","0")
          dom.setAttribute("onload","this.height=innerframe.document.body.scrollHeight")

          // http://localhost:8281/my/advertisement/list ?type=ONLINEBUY&status=OPENING&pageNo=1&pageSize=10&totalPage=1

          dom.setAttribute("src",loc + '?type='+ type+'&status=OPENING&pageNo=' + newPage + '&pageSize=10&totalPage=' + total)
          $("#footer").before(dom)
          console.log("加载一次")
          $("#main_content").attr("data-page", newPage);

        }


      }
    }, false);

// ?settlementType=&pageNo=1&pageSize=10&totalPage=1
  }


}

