import dispatcher from '../dispatcher/dispatcher';
import shopConstants from '../constants/shopConstants';
import assign from 'object-assign';
import apiService from '../services/apiService';

const CHANGE = 'CHANGE';

let EventEmitter = require("events").EventEmitter;
let shopInfo = null;

let shopStore = assign({}, EventEmitter.prototype, {
	registerShopInfoChange: function(callback) {
		this.on(CHANGE, () => {
			callback(shopInfo);
		});
	},

	removeListener: function(callback) {
		this.removeListener(CHANGE, callback);
	},

	emitChange: function() {
		this.emit(CHANGE);
	},

	getCurrency: function(callback) {
		this.getShopProperty('currency', callback);
	},

	getLogo: function(callback) {
		this.getShopProperty('logo', callback);
	},

	getShopName: function(callback) {
		this.getShopProperty('shopName', callback);
	},

	getShopProperty: function(propertyName ,callback) {
		this.getShopInfo().then((result) => {	
			callback(result[propertyName]);
		}).catch((e) => {
			console.error(e);
		});		
	},

	getShopInfo: function() {
		return new Promise((resolve, reject) => {
			if (shopInfo) {
				resolve(shopInfo);
			}else{
				apiService.getShopInfo().then((result) => {
					shopInfo = result;
					resolve(shopInfo);
				}).catch((e) => {
					console.error('fetch shop inof error:', e);
					reject(e);
				});
			}
		});
	},

	dispatcherIndex: dispatcher.register((payLoad) => {
		switch(payLoad.action) {
			case shopConstants.GET_INFO:
				if (!shopInfo) {
					apiService.getShopInfo().then((result) => {
						shopInfo = result;
						shopStore.emitChange();
					}).catch((e) => {
						console.error('fetch shop inof error:', e);
					});
				}else{
					shopStore.emitChange();
				}

				break;
			default:
				break;
		}
	})
});

module.exports = shopStore;