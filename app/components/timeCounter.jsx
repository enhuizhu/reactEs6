import React from 'react';

class TimeCounter extends React.Component {
	constructor(props) {
		super(props);
		
		this.currentWait = this.props.wait;

		this.state = {
			wait: this.currentWait
		}

		this.setTimer();
	}

	setTimer() {
		if (this.currentWait <= 0) {
			this.props.callback();
			return false;
		}

		setTimeout(() => {
			this.currentWait -= 1;
			this.setState({wait: this.currentWait});
			this.setTimer();
		}, 1000);
	}

	render() {
		let dynamicMessage = this.props.message.replace('%s', this.state.wait);
		
		return (
			<div className="alert alert-warning">
				{dynamicMessage}
			</div>
		);
	}
}


TimeCounter.propTypes = {
	message: React.PropTypes.string,
	wait: React.PropTypes.number,
	callback: React.PropTypes.func
};

TimeCounter.defaultProps = {
	message: 'your basket is empty, will go back to home page in %s seconds.',
	wait: 3,
	callback: function(){}
};

export default TimeCounter;