'use strict';

import React from 'react';
import {PrefixedEvent} from '../helpers/eventHelper.js';

class ProductThumbnail extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		PrefixedEvent(this.refs.plusSign, "AnimationEnd", () => {
			jQuery(this.refs.plusSign).removeClass("plus-fade-out");
		});
	}

	btnClickHandler() {
		jQuery(this.refs.plusSign).addClass("plus-fade-out");
		this.props.callback(this.props.product);
	}

	render() {
		return (
			<div className="product-thumbnail center-block">
				<div>
					<img src={this.props.product.img} className="product-img img-thumbnail"/>
				</div>
				<div className="product-description">
					{this.props.product.name}
				</div>
				<div className="product-action">
					<span className="price text-primary">&pound;{this.props.product.price}</span>
					<span className="actions">
						<button className="btn btn-primary" onClick={this.btnClickHandler.bind(this)}>
							<span className="basket glyphicon glyphicon-shopping-cart"></span>
							Buy
						</button>
						
					</span>
					<span className="clearfix"></span>
				</div>
				<div className="plus-sign text-primary" ref="plusSign">
					+1
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