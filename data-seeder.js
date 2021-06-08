let devStub = require("./stubs/HardwareStub.js");

devStub.connect("mqtt://biercooldev1:biercooldev1@176.31.253.202:1883/");

var t1 = 28;
var t2 = 28;
var p1 = true;
var p2 = true;

setInterval(function(){

	if(Math.random() > 0.98) {
		p1 = !p1;
		t1 = 28;
	}
	if(Math.random() > 0.98) {
		p2 = !p2;
		t2 = 28;
	}

	t1 = t1 + (Math.floor(Math.random() * (3 - t1))*(p1?0.04:0.10));
	t2 = t2 + (Math.floor(Math.random() * (3 - t2))*(p2?0.04:0.10));

	devStub.send("biercooldev1", t1, t2, p1, p2);

}, 5000);
