'use strict';

import React from 'react';
import { Link } from 'react-router';
import basketStore from '../stores/basketStore';

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            total: basketStore.getTotal(),
		};
	}

    displayBasket() {
        jQuery('#basket').modal('show');
    }

    onBasketChange() {
        this.setState({
            total: basketStore.getTotal(),
            totalQuantity: basketStore.getTotalQuantity()
        });
    }

    componentDidMount() {
        basketStore.addChagneListener(this.onBasketChange.bind(this));
	}

    componentWillUnmount() {
        basketStore.removeChangeListener(this.onBasketChange);
	}

	getChildrenMenu(data) {
		var that = this;		

		console.log('meunu data', data);

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

			return <li key={k}> {link} </li>;
		});

		return (<div className="sub-nav">
					<div className="menu-section">
						<div className="menu-actions"> MENU </div>
					</div>
					<div className="basket-section">
						<div className="btn-success glyphicon glyphicon-shopping-cart square-btn basket"
							 onClick={this.displayBasket.bind(this)}> {this.state.currency}{this.state.total}
						</div>
					</div>
					<div className="menu-categories">
						<ul>{lis}</ul>
					</div>
				</div>);
	}

	render() {
		return (
			<div>
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
