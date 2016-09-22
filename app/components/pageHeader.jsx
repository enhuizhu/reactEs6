'use strict';

import React from 'react';
import Menu from './menu.jsx';

class PageHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menus: [
				{
					title: "HOME",
					href: "/home",
					active: true
				},
				{
					title: "STARTER",
					href: "/starter",
					active: false
				},
				{
					title: "NODDLES",
					href: "/noodle",
					active: false
				},
				{
					title: "RICE",
					href: "/rice",
					active: false
				},
				{
					title: "VEGETABLE",
					href: "/vegetable",
					active: false
				},
				{
					title: "PORK",
					href: "/port",
					active: false
				},
				{
					title: "BEEF",
					href: "/beef",
					active: false
				},
				{
					title: "DESERT",
					href: "/starter",
					active: false
				}
			]
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

