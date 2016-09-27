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
		
		this.state = {
			product: {
				id:1,
				img: "http://www.chinesevillage.co.uk/wp-content/uploads/2015/04/Chinese-Food-Wallpapers10.jpg",
				description: "stir fried noodle",
				title: "stir fried noodle",
				price: "3.00"
			},

			product2: {
				id:2,
				img: "http://www.mommyscuisine.com/wp-content/uploads/vegfriedriceleadimage.jpg",
				description: "stir fried rice",
				title: "stir fried rice",
				price: "4.00"
			},

			total: basketStore.getTotal(),
			totalQuantity: basketStore.getTotalQuantity()
		}

		basketStore.addChagneListener(() => {
			this.setState({
				total: basketStore.getTotal(),
				totalQuantity: basketStore.getTotalQuantity()
			});
		});
	}


	displayBasket() {
		jQuery('#basket').modal('show');
	}

	render() {
		return (<div>
			<PageHeader activeUrl={this.props.params.category}></PageHeader>
			<section className="main-section">
				{this.props.children}
			</section>

			<footer className="footer">
				<div className="container">
			        <p className="text-muted">Online marketing solution</p>
			    </div>
			</footer>

			<div className="fix-footer">
				<div className="bg-primary center-block square-btn" onClick={this.displayBasket.bind(this)}>
					Total £{this.state.total} ({this.state.totalQuantity})
				</div>
			</div>

			<Modal modalId="basket" title="Basket">
			   <Basket></Basket>
			</Modal>
		</div>);
	}
}

export default Home;