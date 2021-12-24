function updateClock() {
	$(".clock")[0].innerHTML = moment().format('HH:mm:ss dddd');
}
updateClock();
setInterval(updateClock, 1000);

//获取天气信息
$.ajax({
        type: 'GET',
        url: 'https://www.yiketianqi.com/free/day?appid=23035354&appsecret=8YvlPNrz',
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
    containment: $('body')
});
});