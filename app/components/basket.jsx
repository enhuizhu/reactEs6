'use strict';

import React from 'react';
import basketAction from '../actions/basketAction.js';
import basketStore from '../stores/basketStore.js';

class Basket extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			total: 0,
			deliverFee: basketStore.getDeliverFee(),
			deliverMethod: basketStore.getDeliverMethod()
		}

		basketStore.addChagneListener(() => {
			this.setState({
				items: basketStore.getItems(),
				total: basketStore.getTotal(),
				deliverMethod: basketStore.getDeliverMethod()
			});
		});
	}

	componentDidMount() {

	}

	removeItem(item) {
       basketAction.deleteItem(item);
	}

	deliverMethodChange(methodCode) {
		basketAction.changeDeliverMethod(methodCode);
	}

	render() {
		let lists = this.state.items.map((item, key) => {
			return (<div className="item-container" key={key}>
				<button onClick={() => {this.removeItem(item)}} className="pull-left"> <span className="glyphicon glyphicon-minus"></span> </button>
				<span className="item-title pull-left"><strong>{item.quantity > 0 ? item.quantity + " X " : ""}</strong>{item.title}</span>
				<span className="item-price pull-right">&pound;{item.price * item.quantity}</span>
				<div className="clearfix"></div>
			</div>)
		})


		return (
			<div className="basket">
				<div className="bg-primary center-block square-btn">
					Go To Checkout
				</div>

				<div className="sections-container">
					<div className="section no-bottom-border">
						<div className="title">
							Your Order
						</div>

						<div>
							<span className="col-xs-6">
								<input type="radio" name="method" value="1" checked={this.state.deliverMethod == 1} onChange={()=>this.deliverMethodChange(1)}/> 
								<label>Delivery</label>
								<br/>
								<span className="small-text">30-45 Mins</span>
							</span>
							
							<span className="col-xs-6">
								<input type="radio" name="method" value="2" checked={this.state.deliverMethod == 2} onChange={()=>this.deliverMethodChange(2)}/> 
								<label>Collection</label>
								<br/>
								<span className="small-text">20 Mins</span>
							</span>

							<div className="clearfix"></div>
						</div>
					</div>

					<div className="section no-bottom-border">
						{lists}
					</div>

					<div className="section">
						<div className="summary-container">
							<div className="pull-left">
								Subtotal
							</div>
							<div className="pull-right">
								&pound;{this.state.total}
							</div>
							<div className="clearfix"></div>
						</div>

						<div className="summary-container">
							<div className="pull-left">
								Delivery fee
							</div>
							<div className="pull-right">
								&pound;{this.state.deliverFee}
							</div>
							<div className="clearfix"></div>
						</div>

						<div className="summary-container large-text">
							<div className="pull-left">
								Total
							</div>
							<div className="pull-right">
								&pound;{this.state.total + this.state.deliverFee}
							</div>
							<div className="clearfix"></div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}

Basket.propTypes = {

};

Basket.defaultProps = {

}

export default Basket;




