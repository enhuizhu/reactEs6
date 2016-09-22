'use strict';

import React from 'react';
import { Link } from 'react-router';

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getChildrenMenu(data) {
		var that = this;		
		
		var lis = data.map(function(d, k) {
			if (d.children && d.children.length > 0) {
				return (<li key={d.url}>
					{d.title}
					{that.getChildrenMenu(d.children)}
				</li>);
			};

			var link = d.active ? 
				(<Link to={d.href} className="active">{d.title}</Link>) :
				(<Link to={d.href}>{d.title}</Link>)

			return <li key={k}>{link}</li>;
		});

		return (<ul>{lis}</ul>);
	}

	render() {
		return (
			<div className="nav">
				{this.getChildrenMenu(this.props.data)}
			</div>
		);
	}
}

Menu.propTypes = {
	data: React.PropTypes.array
};

Menu.defaultProps = {
	data: []
};

export default Menu;
