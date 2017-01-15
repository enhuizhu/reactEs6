import React from 'react';
import basketAction from '../actions/basketAction.js';
import basketStore from '../stores/basketStore.js';
import shopStore from '../stores/shopStore.js';

class Recipt extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			items: basketStore.getItems(),
			total: basketStore.getTotal(),
			deliverFee: basketStore.getDeliverFee(),
			currency: '',
		}
	}

	componentDidMount() {
		shopStore.getCurrency((currency) => {
			this.setState({currency: currency});
		});

		// shopStore.registerShopInfoChange(this.onShopInfoChange.bind(this));
		basketStore.addChagneListener(this.onBasketChange.bind(this));
	}

	onShopInfoChange(shopInfo) {
		this.setState({currency: shopInfo.currency});
	}

	componentWillUnmount() {
		basketStore.removeChangeListener(this.onBasketChange);
	}

	onBasketChange() {
		this.setState({
			items: basketStore.getItems(),
			total: basketStore.getTotal(),
		});
	}

	removeItem(item) {
        basketAction.deleteItem(item);
	}

	render() {
		let lists = this.state.items.map((item, key) => {
			return (<div className="item-container" key={key}>
				<button onClick={() => {this.removeItem(item)}} className="pull-left"> <span className="glyphicon glyphicon-minus"></span> </button>
				<span className="item-title pull-left"><strong>{item.quantity > 0 ? item.quantity + " X " : ""}</strong>{item.name}</span>
				<span className="item-price pull-right">{this.props.currency}{item.price * item.quantity}</span>
				<div className="clearfix"></div>
			</div>)
		});


		return (
			<div>
				<div className="section">
					{lists}
				</div>

				<div className="section">
					<div className="summary-container">
						<div className="pull-left">
							Subtotal
						</div>
						<div className="pull-right">
							{this.props.currency}{this.state.total}
						</div>
						<div className="clearfix"></div>
					</div>

					<div className="summary-container">
						<div className="pull-left">
							Delivery fee
						</div>
						<div className="pull-right">
							{this.props.currency}{this.state.deliverFee}
						</div>
						<div className="clearfix"></div>
					</div>

					<div className="summary-container large-text">
						<div className="pull-left">
							Total
						</div>
						<div className="pull-right">
							{this.props.currency}{this.state.total + this.state.deliverFee}
						</div>
						<div className="clearfix"></div>
					</div>

				</div>
			</div>
		);
	}
}

Recipt.propTypes = {
};

Recipt.defaultProps = {
};


export default Recipt;