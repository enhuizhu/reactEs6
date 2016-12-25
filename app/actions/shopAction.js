import dispatcher from '../dispatcher/dispatcher';
import shopConstants from '../constants/shopConstants';

module.exports = {
	getShopInfo: function() {
		let payLoad = {
			action: shopConstants.GET_INFO
		};

		dispatcher.dispatch(payLoad);
	}
};