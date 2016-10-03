'use strict';

let dispatcher = require('../dispatcher/dispatcher');
let menuConstants = require('../constants/menuConstants');

module.exports = {
	setActiveUrl: function(currentUrl) {
		let payLoad = {
			action: menuConstants.SET_ACTIVE_URL,
			data: currentUrl
		}

		dispatcher.dispatch(payLoad);
	},
}

