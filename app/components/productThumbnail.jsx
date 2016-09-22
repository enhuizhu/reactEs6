'use strict';

import React from 'react';

class ProductThumbnail extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="product-thumbnail center-block">
				<div>
					<img src={this.props.product.img} className="product-img img-thumbnail"/>
				</div>
				<div className="product-description">
					{this.props.product.description}
				</div>
				<div className="product-action">
					<span className="price text-primary">{this.props.product.price}</span>
					<span className="actions">
						<button className="btn btn-primary">
							<span className="basket glyphicon glyphicon-shopping-cart"></span>
							Buy
						</button>
						
					</span>
					<span className="clearfix"></span>
				</div>
			</div>
		);
	}
}

ProductThumbnail.propTypes = {

};

ProductThumbnail.defautProps = {

};

export default ProductThumbnail;
