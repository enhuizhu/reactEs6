import React from 'react';
import PageHeader from '../components/pageHeader.jsx';
import ProductThumbnail from '../components/productThumbnail.jsx';

class Home extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			product: {
				img: "http://www.chinesevillage.co.uk/wp-content/uploads/2015/04/Chinese-Food-Wallpapers10.jpg",
				description: "stir fried noodle",
				price: "£3.00"

			}
		}
	}

	render() {
		let items = [];
		
		for(let i = 0; i < 16; i++) {
			items.push(<div className="col-xs-6 col-sm-3 col-md-2" key={i}>
					<ProductThumbnail product={this.state.product}></ProductThumbnail>
			</div>);	
		}

		return (<div>
			<PageHeader></PageHeader>
			<section className="main-section">
				<h4>Featured Food</h4>
				<div className="content">
					<div className="row">
						{items}
					</div>
				</div>
			</section>

			<footer className="footer">
				<div className="container">
			        <p className="text-muted">Online marketing solution</p>
			    </div>
			</footer>
		</div>);
	}
}

export default Home;


