'uset strict';

import React from 'react';
import basketStore from '../stores/basketStore.js';
import baketAction from '../actions/basketAction.js';
import ProductThumbnail from '../components/productThumbnail.jsx';
import Modal from '../components/modal.jsx';
import Basket from '../components/basket.jsx';

class Products extends React.Component {
	constructor(props) {
		super(props);
		
		if(!this.props.params.category) {
			let product = {
				id:1,
				img: "http://www.chinesevillage.co.uk/wp-content/uploads/2015/04/Chinese-Food-Wallpapers10.jpg",
				description: "stir fried noodle",
				title: "stir fried noodle",
				price: "3.00"
			};

			let product2 = {
				id:2,
				img: "http://www.mommyscuisine.com/wp-content/uploads/vegfriedriceleadimage.jpg",
				description: "stir fried rice",
				title: "stir fried rice",
				price: "4.00"
			}

			let items = [];
		
			for(let i = 0; i < 16; i++) {
				let random = Math.round(Math.random() * 2) + 1;
				let newproduct = random === 1 ? product : product2;

				items.push(newproduct);	
			}

			console.info("items", items);

			this.state= {
				products: items,
				title: "Featured Food",
				total: basketStore.getTotal(),
				totalQuantity: basketStore.getTotalQuantity()
			};
		}else{
			this.state = {
				products: [],
				title: "",
				total: basketStore.getTotal(),
				totalQuantity: basketStore.getTotalQuantity()
			};
		}

		basketStore.addChagneListener(() => {
			this.setState({
				total: basketStore.getTotal(),
				totalQuantity: basketStore.getTotalQuantity()
			});
		});
	}

	componentDidMount() {
		console.info("params",this.props.params);
	}

	componentWillReceiveProps(nextProps, nextState) {
		console.info("--- props -- ", nextProps.params, nextState);
	}

	addProduct(item) {
		baketAction.addToBasket(item);
	}

	displayBasket() {
		jQuery('#basket').modal('show');
	}

	render() {
		let items = this.state.products.map((v, i) => {
			return (<div className="col-xs-6 col-sm-3 col-md-2" key={i}>
					<ProductThumbnail product={v} callback={()=> {this.addProduct(v)}}></ProductThumbnail>
			</div>);
		})

		return (<div>
			<div>
					<div className="col-xs-6 col-sm-3 col-md-2">
						<div className="center-block title">{this.state.title}</div>
					</div>
					<div className="col-xs-6 col-sm-3 col-md-2">
					</div>
					<div className="col-xs-6 col-sm-3 col-md-2">
					</div>
					<div className="col-xs-6 col-sm-3 col-md-2">
					</div>
					<div className="col-xs-6 col-sm-3 col-md-2">
					</div>
					<div className="col-xs-6 col-sm-3 col-md-2">
					</div>
				</div>
				<div className="clearfix"></div>

				<div className="content">
					<div>
						{items}
					</div>
					<div className="clearfix"></div>
				</div>

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

Products.propTypes = {
};

Products.defaultProps = {
};

export default Products;