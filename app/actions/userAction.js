import dispatcher from '../dispatcher/dispatcher';
import userConstants from '../constants/userConstants';
import apiService from '../services/apiService';

module.exports = {
	userLogin: function(userInfo) {
		apiService.loginUser(userInfo.username, userInfo.password).then((response) => {
			if (response.success) {
				let payLoad = {
					action: userConstants.SET_TOKEN,
					data: response.token
				};

				dispatcher.dispatch(payLoad);
			}
		}).catch((e) => {
			console.error("login error:", e);
		});
	}
}

