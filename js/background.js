chrome.contextMenus.create({
	title: "检测更新",
	onclick: function(){ 
		checkAll();
	}
});

checkAll();

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
	if (obj.type == "GBK") {
		try {
			// 处理网页编码为GBK的网站
			fetch(myRequest).then(res=> res.blob()).then(blob => {
	        	var reader = new FileReader();
	        	reader.onload = function(e) {
	         		var text = reader.result;
	          		var parser = new DOMParser()
					var doc = parser.parseFromString(text, 'text/html');
					getNewTitle(doc, obj);
	        	}
	        	reader.readAsText(blob, 'GBK') 
	    	})
		} catch(e) {
			
		}
		
	}
	else {
		try {
			fetch(myRequest).then((res)=>{
	    		return res.text();
			}).then((text)=>{
				var parser = new DOMParser()
				var doc = parser.parseFromString(text, 'text/html');
				getNewTitle(doc, obj);
	  		})
		} catch(e) {
			
		}
	}
	
}

function getNewTitle(doc, obj) {
	try {
		var newTitle = doc.querySelector(obj.selector).textContent.trim();
		createNotification(obj.name, newTitle, obj.url);
	} catch(e) {
			
	}
	
}

// 创建通知
function createNotification(name, newTitle, url) {
	var oldTitle = window.localStorage.getItem(name);
	var notifId = new Date().getTime() + '';
	if (newTitle != oldTitle) {
		var notif = chrome.notifications.create(notifId, {
			type: 'basic',
			iconUrl: '../../assets/img/icon128.png',
			title: name,
			message: newTitle
		});
		if (url) {
			window.localStorage.setItem(name, newTitle);
			// 点击打开对应的页面
			chrome.notifications.onClicked.addListener((id)=>{
				if (notifId == id) {
					window.open(url);
				}
			});
		}

	}
}

//定时提醒功能
setInterval(function(){
	setMyInterval();
}, 60*1000);

function setMyInterval() {
	var array = getIntervalLocalStorage();
	var myDate = new Date();
	var newArray = [];
	
	for (var i = 0; i < array.length; i ++) {
		var obj = array[i];
		var nowDateStr = myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate() + " " + obj.time;
		var long = new Date(nowDateStr).getTime() - myDate.getTime();
		if (long > 0 && long <= obj.before * 60 * 1000) {
			createNotification("定时提醒", obj.msg)
			if (obj.repeat == '是') {
				newArray.push(obj);
			}
		}
		else {
			newArray.push(obj);
		}
	}
	setIntervalLocalStorage(newArray);
	
}