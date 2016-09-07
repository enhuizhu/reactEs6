'uset strict';

import React from 'react';
import productActions from '../actions/productAction';
import productsStore from '../stores/productsStore';

export default class Products extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			products: []
		}
	}

	componentDidMount() {
		


		productActions.setProducts().then(() => {

		}).catch((e) => {

		});
	}

	_onChange() {

	}

	render() {
		return (<div>this is product page</div>);
	}
}
