document.addEventListener('DOMContentLoaded', function() {
	setConfigTable();
});

function setConfigTable(){
	var array = getIntervalLocalStorage();
	var trStr = "";
	console.log(array)
	for (var i = 0; i < array.length; i ++) {
		trStr += ('<tr><td>' + (i+1) + '</td>'
			+'<td>' + array[i].msg + '</td>'
			+'<td>' + array[i].time + '</td>'
			+'<td>' + array[i].repeat + '</td>'
			+'<td>' + array[i].before + '</td>'
			+'<td><button type="button" class="btn btn-primary btn-sm updateConfig" >修改</button>&nbsp;&nbsp;&nbsp;&nbsp;'
			+'<button type="button" class="btn btn-danger btn-sm deleteConfig">删除</button></td><tr>');
	}
	$("#tb").empty();
	$("#tb").append(trStr);
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
	$('#dialog-msg').val($(tdArray[1]).text());
	$('#dialog-hour').val($(tdArray[2]).text().split(":")[0]);
	$('#dialog-minute').val($(tdArray[2]).text().split(":")[1]);
	$('#dialog-second').val($(tdArray[2]).text().split(":")[2]);
	$('#dialog-repeat').val($(tdArray[3]).text());
	$('#dialog-before').val($(tdArray[4]).text());
	$('#dialog-index').val(index);
	$('#dialog').modal('show');
})

//删除
$("table").on('click', '.deleteConfig', function() {
	var tdArray = $(this).parent().parent().children();
	var index = $(tdArray[0]).text() - 1;
	var objArray = getIntervalLocalStorage();
	var array = [];
	for (var i = 0; i < objArray.length; i++) {
		if (i != index) {
			array.push(objArray[i]);
		}
	}
	setIntervalLocalStorage(array);
	setConfigTable();
})

//保存
$("#dialog-save").click(function() {
	var title = $('#dialog-title').text();
	var index = $('#dialog-index').val();
	var obj = {"msg":$('#dialog-msg').val(),"time":($('#dialog-hour').val() + ":" + $('#dialog-minute').val() + ":" + $('#dialog-second').val()),
		"repeat":$('#dialog-repeat').val(),"before":$('#dialog-before').val()};
	if (title == '修改') {
		var objArray = getIntervalLocalStorage();
		objArray[index] = obj;
		setIntervalLocalStorage(objArray);
		$('#dialog').modal('hide');
		setConfigTable();
	}
	else if (title == '新增'){
		var objArray = getIntervalLocalStorage();
		if (!objArray) {
			objArray = []
		}
		objArray.push(obj)
		setIntervalLocalStorage(objArray)
		$('#dialog').modal('hide');
		setConfigTable();
	}
	
})





