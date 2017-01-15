'use strict';

import dispatcher from '../dispatcher/dispatcher';
import productConstants from '../constants/productConstants';
import apiService from '../services/apiService';

module.exports = {
	pageInfo: {

	},
	
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

	setProductsToStore: function(apiResponse, isAaddingProducts = false) {
		this.pageInfo = {
			currentPage: apiResponse.currentPage,
			totalPages: apiResponse.totalPages
		};

		let products = apiResponse.products.map( v => {
			return Object.assign({}, v, {img: config.apiPath + "uploads/" + v.pics}) 	
		});

		let payLoad = {
			action: isAaddingProducts ? productConstants.ADD_PRODUCTS : productConstants.SET_PRODUCT,
			data: products
		}

		dispatcher.dispatch(payLoad);
	},

	setProducts: function(category) {
		apiService.getProducts(category).then((response) => {
			this.setProductsToStore(response);
		});		
	},

	loadMoreProducts: function(category) {
		if (this.pageInfo.totalPages > this.pageInfo.currentPage) {
			let newCurrentPage = parseInt(this.pageInfo.currentPage) + 1;
			
			apiService.getProducts(category, newCurrentPage).then((response) => {
				this.setProductsToStore(response, true);
			});
		}
	},

	searchProducts: function(keywords) {
		apiService.searchProducts(keywords).then( response => {
			this.setProductsToStore(response);
		});	
	}
};
