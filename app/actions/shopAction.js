import dispatcher from '../dispatcher/dispatcher';
import shopConstants from '../constants/shopConstants';
import apiService from '../services/apiService';

module.exports = {
	getShopInfo: function() {
		let payLoad = {
			action: shopConstants.GET_INFO
		};

		dispatcher.dispatch(payLoad);
	}
};