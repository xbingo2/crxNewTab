// 拦截js 实现csdn的代码复制添加版权信息
chrome.webRequest.onBeforeRequest.addListener(details => {
	if (details.initiator == "https://blog.csdn.net" && details.type =="script") {
		if (details.url.indexOf("copyright") >= 0) {
			return {cancel: true};
		}
	}
}, {urls: ["<all_urls>"]}, ["blocking"]);