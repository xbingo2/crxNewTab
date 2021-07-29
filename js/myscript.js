function updateClock() {
	$(".clock")[0].innerHTML = moment().format('HH:mm:ss dddd');
}
updateClock();
setInterval(updateClock, 1000);