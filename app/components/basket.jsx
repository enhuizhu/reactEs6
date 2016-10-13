import React from 'react';
import Recipt from './recipt.jsx';
import basketAction from '../actions/basketAction.js';
import basketStore from '../stores/basketStore.js';
import { Link } from 'react-router';

class Basket extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			deliverMethod: basketStore.getDeliverMethod()
		};
	}

	
	deliverMethodChange(e) {
 	    this.setState({
      		deliverMethod: e.target.value
    	});
	}

	render() {
		const {deliverMethod} = this.state; 

		return (
			<div className="basket">
				<Link to="/checkout">
					<div className="bg-primary center-block square-btn">
						Go To Checkout
					</div>
				</Link>

				<div className="sections-container">
					<div className="section no-bottom-border">
						<div className="title">
							Your Order
						</div>

						<div>
							<span className="col-xs-6">
								<input type="radio" value={1} checked={deliverMethod == 1} onChange={this.deliverMethodChange.bind(this)}/> 
								<label>Delivery</label>
								<br/>
								<span className="small-text">30-45 Mins</span>
							</span>
							
							<span className="col-xs-6">
								<input type="radio" value={2} checked={deliverMethod == 2} onChange={this.deliverMethodChange.bind(this)}/> 
								<label>Collection</label>
								<br/>
								<span className="small-text">20 Mins</span>
							</span>

							<div className="clearfix"></div>
						</div>
					</div>

					<Recipt></Recipt>
				</div>
			</div>
		);
	}
}

Basket.propTypes = {
	
};

Basket.defaultProps = {

};

export default Basket;




