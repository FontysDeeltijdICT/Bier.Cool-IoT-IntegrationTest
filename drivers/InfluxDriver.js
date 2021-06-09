let {InfluxDB, FluxTableMetaData} = require('@influxdata/influxdb-client');

var InfluxDriver = function () {};

InfluxDriver.prototype.connect = function (url, token, org) {
	InfluxDriver.prototype.queryApi = new InfluxDB({url, token}).getQueryApi(org)
};

InfluxDriver.prototype.request = function (deviceid, callback) {
	
	var fluxQuery = `from(bucket: "biercool")
  |> range(start:-30m)
  |> filter(fn: (r) => r["_measurement"] == "beer")
  |> filter(fn: (r) => r["device"] == "`+deviceid+`")
  |> last()`;
	
	var result = {};
	
	InfluxDriver.prototype.queryApi.queryRows(fluxQuery, {
		
	  next(row, tableMeta) {
		const o = tableMeta.toObject(row);
		result[o._field] = o._value;
	  },
	  error(error) {
		console.error(error)
		return 'error';
	  },
	  complete() {
		  callback(result);
	  },
	});
};

module.exports = new InfluxDriver();