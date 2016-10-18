import dispatcher from '../dispatcher/dispatcher';
import loaderConstants from '../constants/loaderConstants';
import assign from 'object-assign';

const CHANGE = 'CHANGE';

let EventEmitter = require("events").EventEmitter,
	isLoading = false;

let loaderStore = assign({}, EventEmitter.prototype, {
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

	setLoadingStatus: function(loadingStatus) {
		isLoading = loadingStatus;
	},

	setLoading: function() {
		this.setLoadingStatus(true);
	}, 

	resetLoading: function() {
		this.setLoadingStatus(false);
	},

	isLoading: function() {
		return isLoading;
	},

	dispatcherIndex: dispatcher.register((payLoad) => {
		switch(payLoad.action) {
			case loaderConstants.SET_LOADER:
				loaderStore.setLoading();
				loaderStore.emitChange();
				break;
			case loaderConstants.RESET_LOADER:
				loaderStore.resetLoading();
				loaderStore.emitChange();
				break;
			default:
				break;
		}
	})
});

module.exports = loaderStore;




