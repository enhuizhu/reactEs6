import dispatcher from '../dispatcher/dispatcher';
import userConstants from '../constants/userConstants';
import apiService from '../services/apiService';

module.exports = {
	userLogin: function(userInfo) {
		return new Promise((resolve, reject) => {
			apiService.loginUser(userInfo).then((response) => {
				if (response.success) {
					let payLoad = {
						action: userConstants.SET_TOKEN,
						data: {token: response.token, username: response.username}
					};

					dispatcher.dispatch(payLoad);
					resolve(response);
				}else{
					reject(response);
				}
			}).catch((e) => {
				reject({success:false, message: e.toString()})
			});
		});
	},

	userLogout: function() {
		let payLoad = {
			action: userConstants.LOGOUT
		};

		dispatcher.dispatch(payLoad);
	}
};