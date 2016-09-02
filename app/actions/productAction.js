'use strict';

let dispatcher = require('../dispatcher/dispatcher'),
let productConstants = require('../constants/productConstants');

module.exports = {
	addProduct: function(data) {
		let payLoad = {
			action: productConstants.ADD_PRODUCT,
			data: data
		}

		dispatcher.dispatch(payLoad);		
	},

	deleteProduct: function(data) {
		let payLoad = {
			action: productConstants.DELETE_PRODUCT,
			data: data
		}

		dispatcher.dispatch(payLoad);
	}
}