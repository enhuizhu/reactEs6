import React from 'react';
import Recipt from './recipt.jsx';
import deliveryStore from '../stores/deliveryStore';

class DeliveryConfirm extends React.Component {
	constructor(props) {
		super(props);
	}

	handlePlaceOrder() {
		this.props.callback();
	}
	
	render() {
		let address = deliveryStore.getAddress();
		
		return (
			<div className="basket">
				<div className="sections-container">
					<h4 className="text-center	">Confirm your order detail</h4>
					<div className="section">
						<div>
							<b>Telephone</b> : {address.tel} <br/>
						</div>
					</div>
					
					<Recipt title="recipt"></Recipt>

					<div className="section">
						<b>Address</b>: {deliveryStore.genearteFullAddress()}
					</div>

					<div className="section">
						<div className="bg-primary center-block square-btn" onClick={this.handlePlaceOrder.bind(this)}>
							Place Order
						</div>
					</div>
				</div>
			</div>
		);
	}
}

DeliveryConfirm.propTypes = {
	callback: React.PropTypes.func
};

DeliveryConfirm.defaultProps = {
	callback: function(){}
};

export default DeliveryConfirm;
