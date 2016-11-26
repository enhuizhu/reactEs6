import React from 'react';
import FacebookBtn from './facebookBtn.jsx';
import apiService from '../services/apiService';
import userAction from '../actions/userAction';
import userStore from '../stores/userStore';
import { browserHistory } from 'react-router';
import _ from "underscore";

class Register extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			errors: []
		};
	}

	componentDidMount() {
		userStore.registerUserLogin(this.onUserLogin.bind(this));
		/**
		* should check if user already login
		**/
		if (userStore.isLogin()) {
			this.onUserLogin();
		}
	}

	componentWillUnmount() {
		userStore.removeUserLoginListener(this.onUserLogin);
	}

	onUserLogin() {
		/**
		* user already login should redirect to homepage
		**/
		this.context.router.push('/');
	}

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

	onSubmit(e) {
		e.preventDefault();

		let postData = {
			username: this.refs.username.value,
			email: this.refs.email.value,
			password: this.refs.password.value
		};

		apiService.regiserNewUser(postData).then((response) => {
			if (response.success) {
				/**
				* automatic login
				**/
				userAction.userLogin(postData);
			}else{
				/**
				* display the error
				**/
				let messages = [];

				if (response.messages) {
					_.each(response.messages, (v, k) => {
						messages.push(v);
					})
				}else{
					messages = [response.message];
				}

				this.setState({errors: messages});
			}
		}).catch((e) => {
			console.error(e);
		});		
	}

	hideAlert(index) {
		let messages = [].concat(this.state.errors);
		messages.splice(index, 1);
		this.setState({errors: messages});
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
					<form onSubmit={this.onSubmit.bind(this)}>
						<div className="form-group">
							<input type="text" className="form-control" name="username" placeholder="User name" pattern="^[a-z0-9_-]{3,15}$" required ref="username"/>
						</div>
					
						<div className="form-group">
							<input type="email" className="form-control" name="email" placeholder="Email" required ref="email"/>
						</div>
						
						<div className="form-group">
							<input type="password" className="form-control" name="password" placeholder="Password" required ref="password"/>
						</div>
						
						<div className="form-group">
							<input type="submit" value="Sign up" className="bg-primary center-block square-btn"/>
						</div>
					</form>
				</div>
			</div>
		);
	}	
}

Register.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Register;

