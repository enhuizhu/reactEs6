import React from 'react';
import FacebookBtn from './facebookBtn.jsx';

class Register extends React.Component {
	constructor(props){
		super(props);
	}

	onSubmit(e) {
		console.info("Register");
		e.preventDefault();

		console.info("username:", this.refs.username.value);
	}

	render() {
		return (
			<div className="eshop-form">
				<FacebookBtn></FacebookBtn>
				<div className="seperator">
					<div className="line"></div>
					<span>or</span>
				</div>
				<div>
					<form onSubmit={this.onSubmit.bind(this)}>
						<div className="form-group">
							<input type="text" className="form-control" name="username" placeholder="Name" pattern="^[a-z0-9_-]{3,15}$" required ref="username"/>
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

export default Register;

