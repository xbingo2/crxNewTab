function updateClock() {
	$(".clock")[0].innerHTML = moment().format('HH:mm:ss');
}
updateClock();
setInterval(updateClock, 1000);

