'use strict';

import dispatcher from '../dispatcher/dispatcher';
import basketConstants from '../constants/basketConstants';

module.exports = {
	addToBasket: function(data) {
		let payLoad = {
			action: basketConstants.ADD_TO_BASKET,
			data: data
		}

		dispatcher.dispatch(payLoad);
	},

	deleteItem: function(data) {
		let payLoad = {
			action: basketConstants.DELETE_ITEM,
			data: data.id
		}

		dispatcher.dispatch(payLoad);
	},

	changeDeliverMethod: function(data) {
		let payLoad = {
			action: basketConstants.CHANGE_DELIVERY_METHOD,
			data: data
		}

		dispatcher.dispatch(payLoad);
	}
}
