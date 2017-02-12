'use strict';

import React from 'react';
import {PrefixedEvent} from '../helpers/eventHelper.js';
import productsStore from '../stores/productsStore.js';

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
					<img src={this.props.product.img} className="product-img"/>
				</div>
				<div className="product-description">
					<span className="capitalize"> {this.props.product.name} </span>
				</div>
				<div className="product-action">
					<div className="price text-primary">{productsStore.getCurrencySymbol(this.props.product.currency)}{this.props.product.price}</div>
					<div className="actions">
						<button className="btn btn-success basket" onClick={this.btnClickHandler.bind(this)}>
							ADD TO BASKET
						</button>

					</div>
					<span className="clearfix"></span>
				</div>
				<div className="plus-sign text-success" ref="plusSign">
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