import React from 'react';
import DeliveryTimeAndNote from '../components/deliveryTimeAndNote.jsx';
import DeliveryAddress from '../components/deliveryAddress.jsx';
import DeliveryConfirm from '../components/deliveryConfirm.jsx';
import TimeCounter from '../components/timeCounter.jsx';
import Error from '../components/error.jsx';
import userStore from '../stores/userStore';
import deliveryStore from '../stores/deliveryStore';
import basketStore from '../stores/basketStore';
import urlService from '../services/urlService';
import apiService from '../services/apiService';
import stateEngin from '../libs/stateEngin';
import _ from 'underscore';

class Checkout extends React.Component {
	constructor(props) {
		super(props);
		this.stateEngin = new stateEngin(['time', 'address', 'confirm']);
		this.state = {
			currentStep: this.stateEngin.getCurrentState(),
			error: '',
			success: '',
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

	handlePlaceOrder() {
		let items = basketStore.getMiniItems(),
			address = deliveryStore.getAddress(),
			time = deliveryStore.getTime();

		let postData = {
			items: items,
			address: address,
			time: time
		};

		apiService.placeOrder(postData)
		.then((res) => {
			console.info('success', res);
			if (!res.success) {
				this.setState({'error': res.message});
			}else{
				/**
				* should empty the basket at this point
				**/
				basketStore.emptyBasket();
				this.setState({'success': res.message});
			}
		})
		.catch((error) => {
			console.info('error', error)
		});

		console.info("place order!", JSON.stringify(postData));
	}

	getComponentBaseOnState() {
		switch(this.stateEngin.getCurrentState()) {
			case 'time':
				return <DeliveryTimeAndNote callback={this.handleDeliverTimeAndNoteCallback.bind(this)} timeAndNote={deliveryStore.getTime()}></DeliveryTimeAndNote>
			case 'address':
				return <DeliveryAddress callback={this.handleDeliverAddress.bind(this)} address={deliveryStore.getAddress()}></DeliveryAddress>;
			default:
				return this.state.success ? <div></div> : <DeliveryConfirm callback={this.handlePlaceOrder.bind(this)}></DeliveryConfirm>;
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
		if (this.state.success) {
			let message = 'you order has been placed successfully, will bring you to the home page in %s seconds.';
			return <div><br/><br/><TimeCounter callback={() => {this.context.router.push("/")}} message={message} type='success'></TimeCounter></div>;
		}

		/**
		* should check if basket is empty
		**/
		if (basketStore.isEmpty()) {
			return <div><br/><br/><TimeCounter callback={() => {this.context.router.push("/")}}></TimeCounter></div>;
		}

		let goBack = this.stateEngin.getCurrentState() === "time" ? '' : <a href="javascript:void(0)" onClick={this.goBack.bind(this)} className="nav-link">Go Back</a>;
		let currentComponent = this.getComponentBaseOnState();
		let error = _.isEmpty(this.state.error) ? '' : <Error closeCallback={()=>{this.setState({error:''})}} msg={this.state.error}></Error>;
		
		return (<div>
			{goBack}
			{error}
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