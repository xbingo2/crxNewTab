
// 解除复制与右键限制！
(function() {
	var _0x320a = ["body", "onselectstart", "oncopy", "onpaste", "onkeydown", "oncontextmenu", "onmousemove", "ondragstart", "onmousedown", "wrappedJSObject", "*", "getElementsByTagName", "length"];
	var doc = document;
	var bd = doc[_0x320a[0]];
	bd[_0x320a[1]] = bd[_0x320a[2]] = bd[_0x320a[3]] = bd[_0x320a[4]] = bd[_0x320a[5]] = bd[_0x320a[6]] = bd[_0x320a[1]] = bd[_0x320a[7]] = doc[_0x320a[1]] = doc[_0x320a[2]] = doc[_0x320a[3]] = doc[_0x320a[4]] = doc[_0x320a[5]] = null;
	doc[_0x320a[1]] = doc[_0x320a[5]] = doc[_0x320a[8]] = doc[_0x320a[4]] = function() {
		return true
	};
	with(document[_0x320a[9]] || document) {
		onmouseup = null;
		onmousedown = null;
		oncontextmenu = null
	};
	var arAllElements = document[_0x320a[11]](_0x320a[10]);
	for(var i = arAllElements[_0x320a[12]] - 1; i >= 0; i--) {
		var elmOne = arAllElements[i];
		with(elmOne[_0x320a[9]] || elmOne) {
			onmouseup = null;
			onmousedown = null
		}
	};
	if(window.location.origin.indexOf("blog.csdn.net") > -1) {
		//优化登陆后复制
	    $('code').css({'user-select':'unset'});
	    $('#content_views pre').css({'user-select':'unset'});
	 
	    //移除“登陆后复制”按钮
	     $('.hljs-button').remove();
	    //移除readmore按钮，并显示全文
	    $('.hide-article-box').remove();
	    $('.article_content').css({'height':'initial'});
	 
	    //去除复制后的copyright小尾巴
	    document.querySelectorAll('*').forEach(item => {
		    item.oncopy = function(e) {
		        e.stopPropagation();
		    }
		});
   }
	
})()

// 根据规则隐藏页面元素
var hideElem = {
    init: function() {
        var url = window.location.href;
        var selectorRules = [];
        var cssRules = ["###footerRightAds"];
        for (var i = 0; i < cssRules.length; i++) {
            var cssRule, params = cssRules[i].split("##");
            if (params.length > 1) {
                cssRule = params[1];
                // 匹配特定域名, ~开头的，根据ADBlock规则跳过隐藏
                var flagMatch = (new RegExp(params[0]).test(url)),
                    flagExcept = (new RegExp("~").test(params[0]));
                if (!flagMatch || (flagMatch && flagExcept)) {
                    continue;
                }
            } else {
                cssRule = params[0];
            }
            var selectors = document.querySelectorAll(cssRule);
            if (selectors.length) {
                selectorRules.push(cssRule);
            }     
        }
        this.elemHideEmulation(selectorRules);
    },
    elemHideEmulation: function(selectors)
    {
      if (!selectors || !selectors.length)
        return;
      var selector = selectors.join(", ");
      this.insertStyleRule(selector + "{display: none !important;}");
    },
    insertStyleRule: function(rule){
        var styleElement;
        var styleElements = document.head.getElementsByTagName("style");
        if (styleElements.length) {
            styleElement = styleElements[0];
        }
        else {
            styleElement = document.createElement("style");
            document.head.appendChild(styleElement);
        }
        styleElement.sheet.insertRule(rule, styleElement.sheet.cssRules.length);
    }
};

hideElem.init();
