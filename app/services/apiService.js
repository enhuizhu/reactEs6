'use strict';

import menuStore from '../stores/menuStore';
import userStore from '../stores/userStore';
import loaderAction from '../actions/loaderAction';
import 'whatwg-fetch';

module.exports = {
	getApiPath: function(path, withToken=false) {
		let basePath = config.apiPath + path;

		if (withToken) {
			basePath += '?token=' + userStore.getToken();
		}

		return basePath;
	},

	getCategories: function() {
		return new Promise((resolve, reject) => {
			this.get('categories').then((response) => {
				let categories = [{
					title: "HOME",
					href: "/",
					active: "false"
				}];

				jQuery.each(response, (k, v) => {
					let item = {
						id: v.id,
						title: v.name.toUpperCase(),
						href: "/products/" + v.name,
						active: false
					};

					categories.push(item);
				});

				resolve(categories);
			}).catch((e) => {
				reject(e);
			});
		}); 
	},

	getProducts: function(category) {
		let path = 'products';	

		if (category) {
			let menu = menuStore.getMenuByName(category.toUpperCase());
			
			if (menu) {
				path += "/" + menu.id;
			}
		}

		return this.get(path);
	},

	getShopInfo: function() {
		return this.get('userprofile');
	},

	searchProducts: function(keywords) {
		let path = 'search';

		if (keywords) {
			path += '/?keyword=' + keywords;
		}

		return this.get(path);
	},

	regiserNewUser: function(userInfo) {
		return this.post('customer/register', userInfo, false);
	},

	loginUser: function(loginInfo) {
		return this.post('customer/login', loginInfo, false);
	},

	placeOrder: function(orderData) {
		return this.post("customer/placeOrder", orderData, true);
	},

	get: function(path, withToken = false) {
		let newPath = this.getApiPath(path, withToken);
		return this.fetch(newPath, 'GET');
	},

	post: function(path, postData, withToken = false) {
		let newPath = this.getApiPath(path, withToken);
		return this.fetch(newPath, 'POST', postData);
	},

	fetch: function(path, method, postData = {}) {
		let basicObj = {method: method};

		if (method === 'POST') {
			basicObj.body = JSON.stringify(postData);
		}

		basicObj.headers = {
			Token: config.userToken
		};

		return new Promise((resolve, reject) => {
			loaderAction.setLoader();

			fetch(path, basicObj).then((res) => {
				return res.json();
			}).then((response) => {
				resolve(response);
				loaderAction.resetLoader();
			}).catch((e) => {
				reject(e);
				loaderAction.resetLoader();
			});
		});
	}
}