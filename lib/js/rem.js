(function (doc, win){
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
            var fs = 100 * (clientWidth / 375);
            if (100 * (clientWidth / 375) > 200) {
                fs = 200;
            }
            docEl.style.fontSize = fs + 'px';
            $("body").css({
                "width": fs * 3.75 + 'px',
                "margin": "0 auto"
            });
			if(typeof iScroll_left === 'function'){
				iScroll_left();
			}
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
	
	(function(){
		var dpr = scale =1;
		var isIPhone = win.navigator.appVersion.match(/iphone/gi);
		var devicePixelRatio = win.devicePixelRatio;
		if (isIPhone) {
			if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {				
				dpr = 3;
			} else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
				dpr = 2;
			} else {
				dpr = 1;
			}
		} else {
			dpr = 1;
		}
		scale = 1 / dpr;
		var metaEl = "";
		metaEl = doc.createElement('meta');
		metaEl.setAttribute('name', 'viewport');
		metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
		if (docEl.firstElementChild) {
			docEl.firstElementChild.appendChild(metaEl);
		} else {
			var wrap = doc.createElement('div');
			wrap.appendChild(metaEl);
			doc.write(wrap.innerHTML);
		}
	})();
		
})(document, window);	