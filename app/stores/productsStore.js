'use strict';

let dispatcher = require("../dispatcher/dispatcher");
let productConstants = require("../constants/productConstants");
let _products = [];
let assign = require("object-assign");
let EventEmiter = require("events").EventEmitter;
let CHANGE_EVENT = "change";

let productsStore = assign({}, EventEmiter.prototype, {
	getAll: function() {
		return _products;
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, () => {
			console.info("change fired");
			callback(_products);
		});
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	deleteProductById: function(id) {
		let index = this.getProductIndexBaseOnProductId(id);

		if (index === false) {
			return false;
		}

		_products.splice(index, 1);
	},

	getProductIndexBaseOnProductId: function(id) {
		for(let index in _products) {
			let product = _products[index];

			if (product.id === id) {
				return parseInt(index);
			}
		}

		return false;
	},

	setProducts: function(products) {
		_products = products;
	},

	getProducts: function() {
		return _products;
	},

	addProduct: function(product) {
		_products = _products.concat([product]);
	},

	dispatchIndex: dispatcher.register((payLoad) => {
		switch(payLoad.action) {
			case productConstants.ADD_PRODUCT:
				productsStore.addProduct(payLoad.data);
				productsStore.emitChange();
				break;
			case productConstants.DELETE_PRODUCT:
				productsStore.deleteProductById(payLoad.data.id);
				productsStore.emitChange();
				break;
			case productConstants.SET_PRODUCT:
				productsStore.setProducts(payLoad.data);
				productsStore.emitChange();
				break;
			default:
				break;	
		}
	}),
});

module.exports = productsStore;
