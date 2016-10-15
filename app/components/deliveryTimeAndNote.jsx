import React from 'react';
import timeService from '../services/timeService';

class DeliveryTimeAndNote extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			deliveryTimeType: 1
		};

		this.openTime = {
			start: 12,
			close: 24
		};
	}

	deliveryTimeTypeChange(e) {
		this.setState({
			deliveryTimeType: e.target.value
		});
	}

	handleContinue() {
		let data = {
			deliveryTime: this.refs.timeList.value,
			note: this.refs.note.value
		};

		this.props.callback(data);
	}

	render() {
		let timeList = timeService.getTimeList(this.openTime, new Date()),
		 	newTimeList = [{description: "Delivery as soon as possible", value: 0}].concat(timeList),
		 	optionsList = newTimeList.map((v, k) => {
				return (<option value={v.value} key={k}>{v.description}</option>);
			});

		return (
			<div className="basket">
				<div className="section-container">
					<div className="section no-bottom-border">
						<div>
							<form>
								<div className="form-group"> 
									<label>Confirm your delivery time</label>
								</div>
								<div className="form-group">
									<select className="form-control" ref="timeList" defaultValue={this.props.timeAndNote.deliveryTime}>
										{optionsList}
									</select>
								</div>
								<div className="form-group">
									<textarea className="form-control" rows="3" ref="note" placeholder="put any notes about the food here" defaultValue={this.props.timeAndNote.note}></textarea>
								</div>
								<div className="form-group">
									<div className="bg-primary center-block square-btn" onClick={this.handleContinue.bind(this)}>
										Pay by cash
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>);
	}
}

DeliveryTimeAndNote.propTypes = {
	callback: React.PropTypes.func,
	timeAndNote: React.PropTypes.object
};

DeliveryTimeAndNote.defaultProps = {
	callback: function(){},
	timeAndNote: {}
};

export default DeliveryTimeAndNote;



