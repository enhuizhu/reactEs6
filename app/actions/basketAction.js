'use strict';

let dispatcher = require('../dispatcher/dispatcher');
let basketConstants = require('../constants/basketConstants');

module.exports = {
	addToBasket: function(data) {
		let payLoad = {
			action: basketConstants.ADD_TO_BASKET,
			data: data
		}

		dispatcher.dispatch(payLoad);
	}
}
