document.addEventListener('DOMContentLoaded', function() {
	setConfigTable();
});

function setConfigTable(){
	chrome.storage.sync.get(_CONFIG, function(items) {
		var array = items.mangabz;
		var trStr = "";
		for (var i = 0; i < array.length; i ++) {
			trStr += ('<tr><td>' + (i+1) + '</td>' 
						 +'<td>' + array[i].name + '</td>'
						 +'<td>' + array[i].url + '</td>'
						 +'<td>' + array[i].selector + '</td>'
						 +'<td>' + (array[i].type ? array[i].type : '') + '</td>'
						 +'<td><button type="button" class="btn btn-primary btn-sm updateConfig" >修改</button>&nbsp;&nbsp;&nbsp;&nbsp;'
						 +'<button type="button" class="btn btn-danger btn-sm deleteConfig">删除</button></td><tr>');
		}
		$("#tb").empty();
		$("#tb").append(trStr);
	});
}

//新增弹窗
$("#addBtn").click(function(){
	$('#dialog-title').text('新增');
	$('#dialog').modal('show');
})

//更新弹窗
$("table").on('click', '.updateConfig', function() {
	var tdArray = $(this).parent().parent().children();
	var index = $(tdArray[0]).text() - 1;
	$('#dialog-title').text('修改');
	$('#dialog-name').val($(tdArray[1]).text());
	$('#dialog-url').val($(tdArray[2]).text());
	$('#dialog-selector').val($(tdArray[3]).text());
	$('#dialog-type').val($(tdArray[4]).text());
	$('#dialog-index').val(index);
	$('#dialog').modal('show');
})

//删除
$("table").on('click', '.deleteConfig', function() {
	var tdArray = $(this).parent().parent().children();
	var index = $(tdArray[0]).text() - 1;
	chrome.storage.sync.get(_CONFIG, function(items) {
		var array = [];
		for (var i = 0; i < items.mangabz.length; i ++) {
			if (i != index) {
				array.push(items.mangabz[i]);
			}
		}
		chrome.storage.sync.set({"mangabz":array}, function() {
			setConfigTable();
		});
	})
})

//保存
$("#dialog-save").click(function() {
	var title = $('#dialog-title').text();
	var index = $('#dialog-index').val();
	var obj = {"name":$('#dialog-name').val(),"url":$('#dialog-url').val(),"selector":$('#dialog-selector').val(),"type":$('#dialog-type').val()};
	if (title == '修改') {
		chrome.storage.sync.get(_CONFIG, function(items) {
			var array = items.mangabz;
			array[index] = obj
			chrome.storage.sync.set({"mangabz":array}, function() {
				$('#dialog').modal('hide');
				setConfigTable();
			});
		})
	}
	else if (title == '新增'){
		chrome.storage.sync.get(_CONFIG, function(items) {
			var array = items.mangabz;
			array.push(obj)
			chrome.storage.sync.set({"mangabz":array}, function() {
				$('#dialog').modal('hide');
				setConfigTable();
			});
		})
	}
	
})



