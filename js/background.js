chrome.contextMenus.create({
	title: "检测更新",
	onclick: function(){ 
		checkAll();
	}
});

setInterval(function(){
	checkAll();
}, 60*60*1000);

function checkAll() {
	//从chrome.storage中查询配置
	chrome.storage.sync.get(_CONFIG, function(items) {
		for (var i = 0; i < items[_CONFIG].length; i ++) {
			getAllUpdate(items[_CONFIG][i]);
		}
	});
}

function getAllUpdate(obj) {
	var myHeaders = new Headers();
	myHeaders.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9');
	myHeaders.append('Accept-Language', 'zh-CN,zh;q=0.9');
	var myInit = { 
		method: 'GET',
		headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

	var myRequest = new Request(obj.url, myInit);
	if (obj.type == "alimanhua") {
		// 处理网页编码为GBK的网站
		fetch(myRequest).then(res=> res.blob()).then(blob => {
        	var reader = new FileReader();
        	reader.onload = function(e) {
         		var text = reader.result;
          		var parser = new DOMParser()
				var doc = parser.parseFromString(text, 'text/html');
				window[_FUN[obj.type]](doc, obj);
        	}
        	reader.readAsText(blob, 'GBK') 
    	})
	}
	else {
		fetch(myRequest).then((res)=>{
    		return res.text();
		}).then((text)=>{
			var parser = new DOMParser()
			var doc = parser.parseFromString(text, 'text/html');
			window[_FUN[obj.type]](doc, obj);
  		})
	}
	
}

// 创建通知
function createNotification(name, newTitle) {
	var oldTitle = window.localStorage.getItem(name);
	if (newTitle != oldTitle) {
		chrome.notifications.create(null, {
			type: 'basic',
			iconUrl: '../../assets/img/icon128.png',
			title: name,
			message: newTitle
		});
		window.localStorage.setItem(name, newTitle);
	}
}

// http://www.mangabz.com/ 漫画网站
function getMangabz(doc, obj){
	var newTitle = doc.getElementsByClassName("detail-list-form-title")[0].children[1].children[0].children[0].textContent;
	createNotification(obj.name, newTitle);
}


// http://www.alimanhua.com 漫画网站
function getAlimanhua(doc, obj) {
	var newTitle = doc.getElementById("play_0").children[0].children[0].children[0].textContent;
	createNotification(obj.name, newTitle);
}

// https://www.80s.tw/
function get80S(doc, obj) {
	var newTitle = doc.getElementsByClassName("xunlei dlbutton1")[0].children[0].getAttribute("thunderrestitle");
	createNotification(obj.name, newTitle);
}

