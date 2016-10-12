import React from 'react';
import DeliveryTimeAndNote from '../components/deliveryTimeAndNote.jsx';
import userStore from '../stores/userStore';
import urlService from '../services/urlService';

class Checkout extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (!userStore.isLogin()) {
			urlService.updatePreUrl('/checkout');
			this.context.router.push("/login");
		}
	}

	handleDeliverTimeAndNoteCallback(data) {
		console.info("value of data:", data);
	}

	render() {
		return (<div>
			<DeliveryTimeAndNote callback={this.handleDeliverTimeAndNoteCallback.bind(this)}></DeliveryTimeAndNote>
		</div>);
	}
}

Checkout.propTypes = {
};

Checkout.contextTypes = {
	router: React.PropTypes.object.isRequired
};

Checkout.defaultProps = {
};

export default Checkout;