var _CONFIG = "mangabz";
var _INTERVAL = "interval";

function setIntervalLocalStorage(array) {
	window.localStorage.setItem(_INTERVAL, JSON.stringify(array));
}

function getIntervalLocalStorage() {
	var str = window.localStorage.getItem(_INTERVAL);
	if (str) {
		return JSON.parse(str);
	}
	else {
		return [];
	}
}


function get_current_element(event) {
	var x = event.clientX, y = event.clientY,element = document.elementFromPoint(x, y);
	return element

}

function track_mouse(event) {
	var elementMouseIsOver = get_current_element(event)
	console.log(elementMouseIsOver);
}
