'use strict';

let callbacks = [];

module.exports = {
	register: function(cb) {
		callbacks.push(cb);
		return callbacks.length - 1;
	},

	dispatch: function(payload){
		callbacks.map((cb) => {
			cb(payload);
		});
	}
}