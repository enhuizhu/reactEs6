'uset strict';

import React from 'react';
import productActions from '../actions/productAction';
import productsStore from '../stores/productsStore';

class Products extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			products: []
		}

		/**
		* register store change events
		**/		
		productsStore.addChangeListener((products) => {this._onChange(products)});
	}

	componentDidMount() {
		productActions.setProducts().then((products) => {
		
		}).catch((e) => {
		
		});
	}

	_onChange(products) {
		this.setState({products: products});
	}

	render() {
		let items = this.state.products.map((v) => {
			return (<li key={v.id}>id: {v.id}&nbsp;&nbsp;{v.title}</li>);
		})

		return (<div>
			<ul>
				{items}
			</ul>
		</div>);
	}
}

Products.propTypes = {

};


Products.defaultProps = {

};

export default Products;