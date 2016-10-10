'use strict';

import React from 'react';
import Menu from './menu.jsx';
import menuStore from '../stores/menuStore';
import menuAction from '../actions/menuAction';
import apiService from '../services/apiService';
import {Link} from 'react-router';
import userStore from '../stores/userStore';

let assign = require("object-assign");

class PageHeader extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			menus: menuStore.getMenus(),
			isLogin: userStore.isLogin(),
		}
	}

	componentWillReceiveProps(nextProps, nextState) {
		if (nextProps.activeUrl != this.props.activeUrl) {
			menuAction.setActiveUrl(nextProps.activeUrl);
		}
	}

	componentDidMount() {
		menuAction.setMenus(this.props.activeUrl);
		menuStore.addChagneListener(this.onMenuChange.bind(this));
		userStore.registerUserLogin(this.onUserStateChange);
		userStore.registerUserLogout(this.onUserStateChange);
	}

	componentWillUnmount() {
		menuStore.removeChangeListener(this.onMenuChange);
		userStore.removeUserLoginListener(this.onUserStateChange);
		userStore.removeUserLogoutListener(this.onUserStateChange);
	}

	onMenuChange(menus) {
		this.setState({menus: menus});
	}

	onUserStateChange() {
		this.setState({isLogin: userStore.isLogin()});
	}

	render() {
		if (this.state.isLogin) {
			let userStates = (
				<Link to="/logout">Logout</Link>
			);
		}else{
			let userStates = (						
				<span>
					<Link to="/login">Login</Link>&nbsp;
					<Link to="/register">Sign up</Link>
				</span>
			);
		}

		return (
			<header>
				<h4>
					Wok Express   
					
					<span className="pull-right">
						<Link to="/login">Login</Link>&nbsp;&nbsp;
						<Link to="/register">Sign up</Link>
					</span>
				</h4>
				<div className="clearfix"></div>
				<div className="search">
					<form className="form-inline">
						<div className="input-group">
							<input type="text" className="form-control" id="key_word"/>
							<span className="input-group-addon">
								Search
							</span>
						</div>
					</form>
				</div>

				<Menu data={this.state.menus}></Menu>
			</header>
		);
	}
}

PageHeader.propTypes = {

};

PageHeader.defaultProps = {

};

export default PageHeader;

