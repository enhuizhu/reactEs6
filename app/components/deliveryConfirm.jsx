import React from 'react';
import Recipt from './recipt.jsx';
import deliveryStore from '../stores/deliveryStore';

class DeliveryConfirm extends React.Component {
	constructor(props) {
		super(props);
	}

	
	render() {
		let address = deliveryStore.getAddress();
		
		return (
			<div className="basket">
				<div className="sections-container">
					<h4>Confirm your order detail</h4>
					<div className="section no-bottom-border">
						<div className="title">
							Address
						</div>
						<div>
							Telephone : {address.tel} </br>
							Address: {deliveryStore.genearteFullAddress}
						</div>
					</div>
					<Recipt></Recipt>
					<div>
						<div className="bg-primary center-block square-btn">
							Place Order
						</div>
					</div>
				</div>
			</div>
		);
	}
}

DeliveryConfirm.propTypes = {

};

DeliveryConfirm.defaultProps = {

};

export default DeliveryConfirm;
