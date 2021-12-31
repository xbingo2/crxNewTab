function updateClock() {
	$(".clock")[0].innerHTML = moment().format('HH:mm:ss dddd');
}
updateClock();
setInterval(updateClock, 1000);

//获取天气信息
$.ajax({
        type: 'GET',
        url: 'https://www.yiketianqi.com/free/day?appid=36836482&appsecret=v0o3PCCn ',
        dataType: 'JSON',
        error: function () {
            alert('网络错误');
        },
        success: function (res) {
            $('#box').append(res.city + '  ' + res.wea + '  ' + res.tem + "°C" + '  (' + res.tem_night + '~' + res.tem_day + '°C)');
        }
    });
  
$(function() {
	$( "#draggable" ).draggable({
    containment: [0, 0, document.body.clientWidth - 50, document.body.offsetHeight - 50]
});
});