'uset strict';

import React from 'react';
import productActions from '../actions/productAction';
import productsStore from '../stores/productsStore';

class Products extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		
	}

	render() {
		let items = this.props.config.products.map((v) => {
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
	config: React.PropTypes.object
};

Products.defaultProps = {
	config: {
		products: []
	}
};

export default Products;