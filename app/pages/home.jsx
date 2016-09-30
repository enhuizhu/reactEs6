import React from 'react';
import PageHeader from '../components/pageHeader.jsx';
import ProductThumbnail from '../components/productThumbnail.jsx';
import Modal from '../components/modal.jsx';
import Basket from '../components/basket.jsx';
import basketStore from '../stores/basketStore.js';
import baketAction from '../actions/basketAction.js';

class Home extends React.Component {
	constructor(props) {
		super(props);
	}


	displayBasket() {
		jQuery('#basket').modal('show');
	}

	render() {
		return (<div>
			<PageHeader activeUrl={this.props.location.pathname}></PageHeader>
			<section className="main-section">
				{this.props.children}
			</section>

			<footer className="footer">
				<div className="container">
			        <p className="text-muted">Online marketing solution</p>
			    </div>
			</footer>

			<Modal modalId="basket" title="Basket">
			   <Basket></Basket>
			</Modal>
		</div>);
	}
}

export default Home;