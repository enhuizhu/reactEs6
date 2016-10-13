import assign from 'object-assign';
import _ from 'underscore';

let EventEmiter = require("events").EventEmitter;

let deliveryStore = assign({}, EventEmiter.prototype, {
	time: {},
	address: {},

	setTimeAndNote: function(timeAndNote) {
		this.time = assign({}, timeAndNote);
	},

	setAddress: function(addressObj) {
		this.address = assign({}, addressObj);
	},

	getTime: function() {
		return this.time;
	},

	getAddress: function() {
		return this.address;
	},

	genearteFullAddress: function() {
		let keys = Object.keys(this.address),
			fullAddress = "";

		keys.map((v) => {
			if (v ! == 'tel' && !_.isEmpty(v)) {
				fullAddress += this.address[v] + ",";
			}
		});

		fullAddress = fullAddress.substr(0, fullAddress.length - 1);

		return fullAddress;
	}
});

module.exports = deliveryStore;
