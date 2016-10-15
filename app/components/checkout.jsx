import React from 'react';
import assign from "object-assign";
import DeliveryTimeAndNote from '../components/deliveryTimeAndNote.jsx';
import DeliveryAddress from '../components/deliveryAddress.jsx';
import DeliveryConfirm from '../components/deliveryConfirm.jsx';
import TimeCounter from '../components/timeCounter.jsx';
import userStore from '../stores/userStore';
import deliveryStore from '../stores/deliveryStore';
import basketStore from '../stores/basketStore';
import urlService from '../services/urlService';
import stateEngin from '../libs/stateEngin';

class Checkout extends React.Component {
	constructor(props) {
		super(props);
		this.stateEngin = new stateEngin(['time', 'address', 'confirm']);
		this.state = {
			currentStep: this.stateEngin.getCurrentState()
		};
	}

	componentDidMount() {
		if (!userStore.isLogin()) {
			this.onUserLogout();
		}

		userStore.registerUserLogout(this.onUserLogout.bind(this));
	}

	onUserLogout() {
		urlService.updatePreUrl('/checkout');
		this.context.router.push("/login");
	}

	componentWillUnmount() {
		userStore.removeUserLogoutListener(this.onUserLogout);
	}

	getComponentBaseOnState() {
		switch(this.stateEngin.getCurrentState()) {
			case 'time':
				return <DeliveryTimeAndNote callback={this.handleDeliverTimeAndNoteCallback.bind(this)} timeAndNote={deliveryStore.getTime()}></DeliveryTimeAndNote>
			case 'address':
				return <DeliveryAddress callback={this.handleDeliverAddress.bind(this)} address={deliveryStore.getAddress()}></DeliveryAddress>;
			default:
				return <DeliveryConfirm></DeliveryConfirm>;
		}
	}

	handleDeliverAddress(data) {
		deliveryStore.setAddress(data);
		console.info("getAddress:", deliveryStore.getAddress());
		this.setState({
			currentStep: this.stateEngin.nextState()
		});
	}

	handleDeliverTimeAndNoteCallback(data) {
		deliveryStore.setTimeAndNote(data);
		
		this.setState({
			currentStep: this.stateEngin.nextState()
		});
	}

	goBack() {
		this.setState({
			currentStep: this.stateEngin.preState()
		});
	}

	render() {
		/**
		* should check if basket is empty
		**/
		if (basketStore.isEmpty()) {
			return <div><br/><br/><TimeCounter callback={() => {this.context.router.push("/")}}></TimeCounter></div>;
		}

		let goBack = this.stateEngin.getCurrentState() === "time" ? '' : <a href="javascript:void(0)" onClick={this.goBack.bind(this)} className="nav-link">Go Back</a>;
		let currentComponent = this.getComponentBaseOnState();
		
		return (<div>
			{goBack}
			{currentComponent}
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