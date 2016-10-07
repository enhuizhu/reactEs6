'use strict';

import React from 'react';
import Menu from './menu.jsx';
import menuStore from '../stores/menuStore';
import menuAction from '../actions/menuAction';
import apiService from '../services/apiService';
import {Link} from 'react-router';

let assign = require("object-assign");

class PageHeader extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			menus: menuStore.getMenus()
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
	}

	componentWillUnmount() {
		menuStore.removeChangeListener(this.onMenuChange);
	}

	onMenuChange(menus) {
		this.setState({menus: menus});
	}

	render() {
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

