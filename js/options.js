document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.sync.get(_CONFIG, function(items) {
		document.getElementById('config').value = JSON.stringify(items);
	});
});

document.getElementById('save').addEventListener('click', function() {
	var config = document.getElementById('config').value;
	try{
		var configObj = JSON.parse(config);
		chrome.storage.sync.set(configObj, function() {
			document.getElementById('msg').text='保存成功！';
		});
	}catch(e){
		document.getElementById('msg').text='保存失败！';
	}
	
});