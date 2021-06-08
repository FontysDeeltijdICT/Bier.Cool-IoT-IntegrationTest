var mqtt = require('mqtt');

var HardwareDeviceStub = function () {};

HardwareDeviceStub.prototype.connect = function (endpoint) {
	HardwareDeviceStub.prototype.client  = mqtt.connect(endpoint);
};

HardwareDeviceStub.prototype.send = function (deviceid, temp1, temp2, pres1, pres2) {
	HardwareDeviceStub.prototype.client.publish(
		'beers/v1/' + deviceid + '/data', 
		`{
			"sensor1": 
			{
				"temperature": `+temp1+`,
				"presence": `+pres1?'1':'0'+`
			},
			"sensor2":
			{
				"temperature": `+temp2+`,
				"presence": `+pres2?'1':'0'+`
			}
		}`
	);
};

HardwareDeviceStub.prototype.disconnect = function (endpoint) {
	HardwareDeviceStub.prototype.client.end();
};

module.exports = new HardwareDeviceStub();