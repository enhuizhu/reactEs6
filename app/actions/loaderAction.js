import dispatcher from '../dispatcher/dispatcher';
import loaderConstants from '../constants/loaderConstants';

module.exports = {
	setLoader: function() {
		let payLoad = {
			action: loaderConstants.SET_LOADER
		}

		dispatcher.dispatch(payLoad);
	},

	resetLoader: function() {
		let payLoad = {
			action: loaderConstants.RESET_LOADER
		}

		dispatcher.dispatch(payLoad);
	}
}