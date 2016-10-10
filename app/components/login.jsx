import React from 'react';
import FacebookBtn from './facebookBtn.jsx';
import userStore from '../stores/userStore';
import {frontendPath} from '../configs/apiConfig' ;

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (userStore.isLogin()) {
			location.href = frontendPath;
		}
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
					<form>
						<div className="form-group">
							<input type="text" className="form-control" name="username" placeholder="" required/>
						</div>
						<div className="form-group">
							<input type="password" className="form-control" name="password" required/>
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


Login.propTypes = {

}

Login.defaultProps = {
	
}

export default Login;