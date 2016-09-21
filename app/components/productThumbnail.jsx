'use strict';

import React from 'react';

class productThumbnail extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="product-thumbnail">
				<div className="thumbnail">
					<img src={this.props.product.img} className="product-img"/>
				</div>
				<div className="product-description">
					{this.props.product.description}
				</div>
				<div className="product-action">
					<span className="price"></span>
					<span className="actions">
						<span className="likes">
							<span className="glyphicon glyphicon-heart"></span>
						</span>
						<span className="basket glyphicon glyphicon-shopping-cart">
						</span>
					</span>
					<span className="clearfix"></span>
				</div>
			</div>
		);
	}
}

productThumbnail.propTypes = {

};

productThumbnail.defautProps = {

};

export default productThumbnail;
