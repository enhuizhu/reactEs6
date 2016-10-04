'use strict';

import apiService from '../services/apiService.js';
import dispatcher from '../dispatcher/dispatcher';
import menuConstants from '../constants/menuConstants';

module.exports = {
	setActiveUrl: function(currentUrl) {
		let payLoad = {
			action: menuConstants.SET_ACTIVE_URL,
			data: currentUrl
		}

		dispatcher.dispatch(payLoad);
	},

	setMenus: function(activeUrl) {
		apiService.getCategories().then((catgories) => {
			let payLoad = {
				action: menuConstants.SET_MENUS,
				data: catgories
			}

			dispatcher.dispatch(payLoad);
			this.setActiveUrl(activeUrl);
		}).catch((err) => {
			console.error(err);
		});
	}
}

