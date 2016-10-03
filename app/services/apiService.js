'use strict';
'use esversion:6';

import apiPath from '../configs/apiConfig.js';

module.exports = {
	getApiPath: function(path) {
		return apiPath + path;
	},

	getCategories: function() {
		return new Promise((resolve, reject) => {
			jQuery.ajax({
				method: "GET",
				url: this.getApiPath("categories"),
				success: function(response) {
					let categories = [{
						title: "HOME",
						href: "/",
						active: "false"
					}];

					jQuery.each(response, (k, v) => {
						let item = {
							title: v.name.toUpperCase(),
							href: "/products/" + v.name,
							active: false
						}

						categories.push(item);
					});

					resolve(categories);
				},

				error: function(err) {
					reject(err);
				}
			});
		}); 
	},

	getProducts: function() {
		return new Promise((resolve, reject) => {
			jQuery.ajax({
				method: "GET",
				url: this.getApiPath("products"),
				success: function(response) {
					console.info("");
				},

				error: function(err) {

				}
			});
		});
	}
}

