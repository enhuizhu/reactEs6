'use strict';

import {apiPath} from '../configs/apiConfig';
import menuStore from '../stores/menuStore';
import userStore from '../stores/userStore';
import 'whatwg-fetch';

module.exports = {
	getApiPath: function(path, withToken=false) {
		let basePath = apiPath + path;

		if (withToken) {
			basePath += '?token=' + userStore.getToken();
		}

		return basePath;
	},

	getCategories: function() {
		return new Promise((resolve, reject) => {
			fetch(this.getApiPath("categories")).then((res) => {
				return res.json();
			}).then((response) => {
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
			});;
		}); 
	},

	getProducts: function(category) {
		return new Promise((resolve, reject) => {
			let path = this.getApiPath("products");	

			if (category) {
				let menu = menuStore.getMenuByName(category.toUpperCase());
				
				if (menu) {
					path += "/" + menu.id;
				}
			}

			fetch(path).then((res) => {
				return res.json();
			}).then((response) => {
				resolve(response);
			}).catch((e) => {
				reject(e);
			});
		});
	},

	regiserNewUser: function(userInfo) {
		return this.post('customer/register', userInfo, false);
	},

	loginUser: function(username, password) {
		let loginInfo = {
				username: username,
				password: password
			};

		return this.post('customer/login', loginInfo, false);
	},

	placeOrder: function(orderData) {
		return this.post("customer/placeOrder", orderData, true);
	},

	post: function(path, postData, withToken) {
		return new Promise((resolve, reject) => {
			let newPath = this.getApiPath(path, withToken);

			fetch(newPath, {
				method: "POST",
				body: JSON.stringify(postData)
			}).then((res) => {
				return res.json();
			}).then((response) => {
				resolve(response);
			}).catch((e) => {
				reject(e);
			});
		});
	},
}

