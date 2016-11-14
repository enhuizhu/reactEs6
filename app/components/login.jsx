import React from 'react';
import FacebookBtn from './facebookBtn.jsx';
import userStore from '../stores/userStore';
import userAction from '../actions/userAction';
import { browserHistory } from 'react-router';
import urlService from '../services/urlService';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: []
		};
	}

	componentDidMount() {
		console.info('previouse url:', urlService.getPreUrl());

		if (userStore.isLogin()) {
			this.onUserLogin();
		}

		userStore.registerUserLogin(this.onUserLogin.bind(this));
	}

	onUserLogin() {
		this.context.router.push(urlService.getPreUrl());
	}

	componentWillUnmount() {
		userStore.removeUserLoginListener(this.onUserLogin);
	}

	handleSubmit(e) {
		e.preventDefault();

		let username = this.refs.username.value,
			password = this.refs.password.value;

		userAction.userLogin({username: username, password: password}).catch((response) => {
			console.info("response:", response);
			this.setState({errors:[response.message]});
		});
	}

	hideAlert(index) {
		let messages = [].concat(this.state.errors);
		messages.splice(index, 1);
		this.setState({errors: messages});
	}

	facebookCallback(param) {
		console.info('param is:', param);
	}

	render() {
		let errors = this.state.errors.map((e, index) => {
			return (<div className="alert alert-danger alert-dismissible" role="alert" ref={"alert" + index} key={index}>
					  <button type="button" className="close" onClick={() => {this.hideAlert(index)}} aria-label="Close"><span aria-hidden="true">&times;</span></button>
						{e}
					</div>);
		});

		return (
			<div className="eshop-form">
				<FacebookBtn callback={this.facebookCallback.bind(this)}></FacebookBtn>
				<div className="seperator">
					<div className="line"></div>
					<span>or</span>
				</div>
				<div>
					{errors}
					<form onSubmit={this.handleSubmit.bind(this)}>
						<div className="form-group">
							<input type="text" className="form-control" name="username" placeholder="" ref="username" required/>
						</div>
						<div className="form-group">
							<input type="password" className="form-control" name="password" ref="password" required/>
						</div>
						<div className="form-group">
							<input type="submit" value="Login" className="bg-primary center-block square-btn"/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

Login.contextTypes = {
	router: React.PropTypes.object.isRequired
};

Login.propTypes = {

};

Login.defaultProps = {
	
};

export default Login;