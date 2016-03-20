import React from 'react';
import ReactDom from 'react-dom';

export default class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data: props.data}
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

			return <li key={d.url}>{d.title}</li>
		});

		return (<ul>{lis}</ul>);
	}

	render() {
		return this.getChildrenMenu(this.state.data);
	}
}
