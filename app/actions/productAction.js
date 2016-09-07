'use strict';

let dispatcher = require('../dispatcher/dispatcher');
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
	},

	setProducts: function() {
		return new Promise((resolve, reject) => {
			fetch('./API/products.json').then((res) => {
				return res.json();
			}).then((json) => {
				let payLoad = {
					action: productConstants.SET_PRODUCT,
					data: json.data
				}

				dispatcher.dispatch(payLoad);
				
				resolve(json.data);
			}).catch((e) => {
				reject(e);
			});
		});
	}
};
