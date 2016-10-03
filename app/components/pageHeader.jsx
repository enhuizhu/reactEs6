'use strict';

import React from 'react';
import Menu from './menu.jsx';
import menuStore from '../stores/menuStore.js';
import menuAction from '../actions/menuAction.js';
import apiService from '../services/apiService.js';

let assign = require("object-assign");

class PageHeader extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			menus: menuStore.getMenus()
		}

		apiService.getCategories().then((catgories) => {
			menuStore.setMenus(catgories);
			menuAction.setActiveUrl(this.props.activeUrl);
		}).catch((err) => {
			console.error(err);
		});

		menuStore.addChagneListener((menus) => {
			this.setState({menus: menus});
		});
	}

	componentWillReceiveProps(nextProps, nextState) {
		if (nextProps.activeUrl != this.props.activeUrl) {
			menuAction.setActiveUrl(nextProps.activeUrl);
		}
	}

	render() {
		return (
			<header>
				<h4>
					Wok Express   
					<span className="phone-number pull-right"><a href="tel:+447588732089"> 07588 732089</a></span>
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

