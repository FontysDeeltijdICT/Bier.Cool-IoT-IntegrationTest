const chai = require('chai');

const devStub = require("../stubs/HardwareStub.js");
const influxDriver = require("../drivers/InfluxDriver.js");

let t1 = Math.floor(Math.random() * 25);
let t2 = Math.floor(Math.random() * 25);

influxDriver.connect("http://176.31.253.202:8086","l-GWmSjd-MqtSYaOpucLN9IA5gsOdkHWkO1ZLnw224uNzCt_4qABkENmGTz6mGR3e56wmkgKlc-edDWT6MbDIg==","biercool");

describe('Connect to MQTT', () => {
  it('Should connect within 250ms', done => {
	chai.should();
	devStub.connect("mqtt://biercooldev1:biercooldev1@176.31.253.202:1883/");
	setTimeout(function(){ 
		devStub.client.connected.should.equal(true);
		done();
	}, 200);
  });
});

describe('Send Temperature', () => {
  it('Should send temperature to MQTT', done => {
	setTimeout(function(){
		chai.should();
		devStub.send("biercooldev1", t1, t2, true, true);
		setTimeout(function(){		
			devStub.client.connected.should.equal(true);
			done();
		}, 50);
	}, 300);
  });
});

describe('MQTT ACL test', () => {
  it('Should be disconnected', done => {
	setTimeout(function(){
		chai.should();
		devStub.send("biercooldev5", t1, t2, true, true);
		setTimeout(function(){		
			devStub.client.connected.should.equal(false);
			done();
		}, 50);
	}, 300);
  });
});

describe('Check database', () => {
  it('Should match the send temperature', function(done) {
	this.timeout(7500);
	setTimeout(function(){
		chai.should();
		var result = influxDriver.request("biercooldev1", res => {
			res.sensor1_temperature.should.equal(t1);
			res.sensor2_temperature.should.equal(t2);
			done();
		});
	}, 7000);
  });
});

