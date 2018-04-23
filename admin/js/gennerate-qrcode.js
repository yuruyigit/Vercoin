var GennerateQrcode = {
		qrcode:function (canvasId, content, logo, topText, bottomText){
		    if(!canvasId || !content){
		        return;
		    }
		    if(!logo){
		        logo = '/resources/admin/img/qrcode_logo_firstre.png';
		    }
		    if(!topText){
		        topText = '';
		    }
            if(!bottomText){
                bottomText = '';
            }
		    var options = {
                    render: 'canvas',
                    ecLevel: 'H',
                    minVersion: 6,
                    fill: '#000000',
                    background: '#ffffff',
                    text: content,
                    size: 260,
                    radius: 5,
                    quiet: 4,
                    mode: 0,
                    mSize: 18,
                    mPosX: 50,
                    mPosY: 50
                };
		    $(canvasId).empty().qrcode(options);
            var canvas = $(canvasId + ' canvas')[0];
            var ctx = canvas.getContext("2d");
            var img = new Image();
            img.src = logo;
            var sWidth = canvas.width;
            var sHeight = canvas.height;
            img.onload = function() {  
                var width = this.width;
                if(width > 60){
                    width = 60;
                }
                var height = this.height;
                if(height > 60){
                    height = 60;
                }
                ctx.drawImage(img, (sWidth-width)/2, (sHeight-height)/2);
            };
            ctx.font = "12px 黑体";  
            ctx.textAlign = "center";  
            ctx.fillStyle = "#000000";
            ctx.textBaseline = 'start';
            bottomText = bottomText.length > 16 ? bottomText.substring(0,16)+'...':bottomText;
            topText = topText.length > 16 ? topText.substring(0,16)+'...':topText;
            ctx.fillText(bottomText, (sWidth)/2, sHeight-8);
            ctx.fillText(topText, (sWidth)/2, 16);
		}
};