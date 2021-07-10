// 解除复制与右键限制！
(function() {
	var _0x320a = ["body", "onselectstart", "oncopy", "onpaste", "onkeydown", "oncontextmenu", "onmousemove", "ondragstart", "onmousedown", "wrappedJSObject", "*", "getElementsByTagName", "length"];
	var doc = document;
	var bd = doc[_0x320a[0]];
	bd[_0x320a[1]] = bd[_0x320a[2]] = bd[_0x320a[3]] = bd[_0x320a[4]] = bd[_0x320a[5]] = bd[_0x320a[6]] = bd[_0x320a[1]] = bd[_0x320a[7]] = doc[_0x320a[1]] = doc[_0x320a[2]] = doc[_0x320a[3]] = doc[_0x320a[4]] = doc[_0x320a[5]] = null;
	doc[_0x320a[1]] = doc[_0x320a[5]] = doc[_0x320a[8]] = doc[_0x320a[4]] = function() {
		return true
	};
	with(document[_0x320a[9]] || document) {
		onmouseup = null;
		onmousedown = null;
		oncontextmenu = null
	};
	var arAllElements = document[_0x320a[11]](_0x320a[10]);
	for(var i = arAllElements[_0x320a[12]] - 1; i >= 0; i--) {
		var elmOne = arAllElements[i];
		with(elmOne[_0x320a[9]] || elmOne) {
			onmouseup = null;
			onmousedown = null
		}
	};
})()