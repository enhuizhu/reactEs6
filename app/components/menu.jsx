'use strict';

import React from 'react';

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
				(<a href={d.href} className="active">{d.title}</a>) :
				(<a href={d.href}>{d.title}</a>)

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
