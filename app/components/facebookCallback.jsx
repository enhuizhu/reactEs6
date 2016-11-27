import React from 'react';
import userAction from '../actions/userAction';

class FacebookCallback extends React.Component {
	facebookCallback(param) {
		console.info('param is:', param);
		let postData = {
			username : param.name,
			email : param.email,
			type: 'facebook'
		}

		userAction.userLogin(postData).catch((response) => {
			console.info("response:", response);
			this.setState({errors:[response.message]});
		});
	}
}

export default FacebookCallback;