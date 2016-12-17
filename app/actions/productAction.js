'use strict';

import {apiPath} from '../configs/apiConfig';
import dispatcher from '../dispatcher/dispatcher';
import productConstants from '../constants/productConstants';
import apiService from '../services/apiService';

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

	setProductsToStore: function(apiResponse) {
		console.info("action setProducts:", apiResponse);
		let products = apiResponse.products.map( v => {
			return Object.assign({}, v, {img: apiPath + "uploads/" + v.pics}) 	
		});

		let payLoad = {
			action: productConstants.SET_PRODUCT,
			data: products
		}

		dispatcher.dispatch(payLoad);
	},

	setProducts: function(category) {
		apiService.getProducts(category).then((response) => {
			this.setProductsToStore(response);
		})		
	},

	searchProducts: function(keywords) {
		apiService.searchProducts(keywords).then( response => {
			console.log('response:', response);
			this.setProductsToStore(response);
		});	
	}
};
