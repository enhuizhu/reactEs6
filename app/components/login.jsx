'use strict';

import React from 'react';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="login">
				<div className="facebook facebook-bg center-block square-btn">
					Login With Facebook	
				</div>
				<div className="seperator">
					<div className="line"></div>
					<span>or</span>
				</div>
				<div>
					<form>
						<div className="form-group">
							<input type="text" className="form-control" name="username"/>
						</div>
						<div className="form-group">
							<input type="password" className="form-control" name="password"/>
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

export default Login;