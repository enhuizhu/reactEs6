import dispatcher from '../dispatcher/dispatcher';
import shopConstants from '../constants/shopConstants';
import assign from 'object-assign';

const CHANGE = 'CHANGE';

let EventEmitter = require("events").EventEmitter,
	isLoading = false;

let shopStore = assign({}, EventEmitter.prototype, {
	registerStatusChange: function(callback) {
		this.on(CHANGE, () => {
			callback(isLoading);
		});
	},

	removeListener: function(callback) {
		this.removeListener(CHANGE, callback);
	},

	emitChange: function() {
		this.emit(CHANGE);
	},

	dispatcherIndex: dispatcher.register((payLoad) => {
		switch(payLoad.action) {
			case shopConstants.GET_INFO:
				shopStore.emitChange();
				break;
			default:
				break;
		}
	})
});

module.exports = shopStore;