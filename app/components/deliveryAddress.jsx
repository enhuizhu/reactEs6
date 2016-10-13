import React from 'react';
import userStore from '../stores/userStore';

class DeliveryAddress extends React.Component {
	constructor(props) {
		super(props);

		console.info("value of address is:", this.props.address);

	}

	handleSubmit(e) {
		e.preventDefault();
		
		let postData = {
			tel: this.refs.tel.value,
			address1: this.refs.address1.value,
			address2: this.refs.address2.value,
			city: this.refs.city,
			postCode: this.refs.postCode.value
		};

		this.props.callback(postData);
	}

	render() {
		let style = {width:"100%"};

		return (
			<div className="basket">
				<div className="section-container">
					<div className="section no-bottom-border">
						<div>
							<form onSubmit={this.handleSubmit.bind(this)}>
								<div className="form-group">   
									<label>{userStore.getUserInfo()}, Confrim your detail.</label>
								</div>
								<div className="form-group">
									<input type="tel" ref="tel" className="form-control" placeholder="your phone number" value={this.props.address.tel} required/>
								</div>
								<div className="form-group">
									<input type="text" ref="address1" className="form-control" placeholder="address1" defaultValue={this.props.address.address1} required/>
								</div>
								<div className="form-group">
									<input type="text" ref="address2" className="form-control" placeholder="address2" defaultValue={this.props.address.address2}/>
								</div>
								<div className="form-group">
									<input type="city" ref="address2" className="form-control" placeholder="city" defaultValue={this.props.address.city}/>
								</div>
								<div className="form-group">
									<input type="city" ref="postCode" className="form-control" placeholder="post code" defaultValue={this.props.address.postCode} required/>
								</div>
								<div className="form-group">
									<input type="submit" className="bg-primary center-block square-btn" style={style} value="Confirm your order detail"/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);


	}
}

DeliveryAddress.propTypes = {
	callback: React.PropTypes.func,
	address: React.PropTypes.object
};

DeliveryAddress.defaultProps = {
	callback: function(){},
	address: {}
};

export default DeliveryAddress;


