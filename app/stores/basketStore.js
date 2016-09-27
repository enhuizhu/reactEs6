'use strict';

let dispatcher = require("../dispatcher/dispatcher");
let basketConstants = require("../constants/basketConstants");
let _items = [];
let assign = require("object-assign");
let EventEmiter = require("events").EventEmitter;
let CHANGE_EVENT = "change";

let basketStore = assign({}, EventEmiter.prototype, {
	deliverFee: 0,

	deliverMethod: 1,

	addChagneListener: function(callback) {
		this.on(CHANGE_EVENT, () => {
			callback(_items);
		});
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	
	addToBasket: function(item) {
		/**
		* check if the item already in the array
		**/
		let findIndex = null;

		for(let i in _items) {
			if (_items[i].id == item.id) {
				findIndex = i;
				break;
			}
		}

		if (findIndex !== null) {
			let newItem = assign({}, _items[findIndex]);
			newItem.quantity ++;
			_items[findIndex] = newItem;
		}else{
			let newItem = assign({}, item);
			newItem.quantity = 1;
			_items = _items.concat([newItem]);
		}

		return _items;
	}, 

	removeItem: function(id) {
		_items = _items.concat([]);
		/**
		* find the item index
		**/
		for(let i in _items) {
			if (_items[i].id == id) {
				let item = assign({}, _items[i]);

				if (item.quantity > 1) {
					item.quantity -= 1;
					_items[i] = item;
				}else{
					_items.splice(i, 1);
				}

				return _items;
			}
		}

		return _items;
	},

	emptyBasket: function() {
		_items = [];
	},

	getItems: function() {
		return _items;
	},

	getTotal: function() {
		let sum = _items.reduce((prev, v)=> {
			return prev + v.price * v.quantity;
		}, 0);

		return sum;
	},

	getTotalQuantity: function() {
		let sum = _items.reduce((prev, v) => {
			return prev + v.quantity;
		}, 0);

		return sum;
	},

	getDeliverFee: function() {
		return this.deliverFee;
	},

	getDeliverMethod: function() {
		return this.deliverMethod;
	},

	setDeliveryMethod: function(method) {
		this.deliverMethod = method;
	},

	setItems: function(items) {
		_items = [].concat(items);
	},

	dispatcherIndex: dispatcher.register((payLoad) => {
		switch(payLoad.action) {
			case basketConstants.ADD_TO_BASKET:
				basketStore.addToBasket(payLoad.data);
				basketStore.emitChange();
				break;
			case basketConstants.DELETE_ITEM:
				basketStore.removeItem(payLoad.data);
				basketStore.emitChange();
				break;
			case basketConstants.CHANGE_DELIVERY_METHOD:
				basketStore.setDeliveryMethod(payLoad.data);
				basketStore.emitChange();
				break;
			default:
				break;
		}
	})

});

module.exports = basketStore;