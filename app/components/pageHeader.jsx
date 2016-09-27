'use strict';

import React from 'react';
import Menu from './menu.jsx';

let assign = require("object-assign");

class PageHeader extends React.Component {
	constructor(props) {
		super(props);
		
		console.info("PageHeader props:", this.props.activeUrl);
		
		this.state = {
			menus: [
				{
					title: "HOME",
					href: "/",
					active: true
				},
				{
					title: "STARTER",
					href: "/products/starter",
					active: false
				},
				{
					title: "NODDLES",
					href: "/products/noodle",
					active: false
				},
				{
					title: "RICE",
					href: "/products/rice",
					active: false
				},
				{
					title: "VEGETABLE",
					href: "/products/vegetable",
					active: false
				},
				{
					title: "PORK",
					href: "/products/port",
					active: false
				},
				{
					title: "BEEF",
					href: "/products/beef",
					active: false
				},
				{
					title: "DESERT",
					href: "/products/starter",
					active: false
				}
			]
		}
	}

	componentWillReceiveProps(nextProps, nextState) {
		console.info("--- PageHeader -- ", nextProps.activeUrl, nextState);
	}

	setActiveMenu(url) {
		let newMenus = [].concat(this.state.menus);

		newMenus.map((v) => {
			let uris = v.href.split("/").filter((v) => {
				return v.trim().length > 0;
			});
			/**
			* it's home page
			**/
			if (uris.length === 0 && !url || (uris[uris.length -1] === url)) {
				v.active = true;
			}else{
				v.active = false;
			}
		})
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

