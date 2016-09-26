import React from 'react';
import PageHeader from '../components/pageHeader.jsx';
import ProductThumbnail from '../components/productThumbnail.jsx';
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
				price: "3.00"
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

	addProduct(item) {
		baketAction.addToBasket(item);
	}

	render() {
		let items = [];
		
		for(let i = 0; i < 16; i++) {
			items.push(<div className="col-xs-6 col-sm-3 col-md-2" key={i}>
					<ProductThumbnail product={this.state.product} callback={()=> {this.addProduct(this.state.product)}}></ProductThumbnail>
			</div>);	
		}

		return (<div>
			<PageHeader></PageHeader>
			<section className="main-section">
				<div>
					<div className="col-xs-6 col-sm-3 col-md-2">
						<div className="center-block title">Featured Food</div>
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
			</section>

			<footer className="footer">
				<div className="container">
			        <p className="text-muted">Online marketing solution</p>
			    </div>
			</footer>

			<div className="fix-footer">
				<div className="bg-primary center-block">
					Total £{this.state.total} ({this.state.totalQuantity})
				</div>
			</div>
		</div>);
	}
}

export default Home;