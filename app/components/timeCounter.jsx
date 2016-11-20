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

	getClassNameBaseOnType(type) {
		switch(type) {
			case 'warning':
				return 'alert-warning';
			case 'success':
				return 'alert-success';
			default:
				return '';
		}
	}

	render() {
		let dynamicMessage = this.props.message.replace('%s', this.state.wait);
		let alertClass = this.getClassNameBaseOnType(this.props.type);
		
		return (
			<div className={'alert ' + alertClass}>
				{dynamicMessage}
			</div>
		);
	}
}


TimeCounter.propTypes = {
	message: React.PropTypes.string,
	wait: React.PropTypes.number,
	type: React.PropTypes.string,
	callback: React.PropTypes.func
};

TimeCounter.defaultProps = {
	message: 'your basket is empty, will go back to home page in %s seconds.',
	wait: 3,
	type: 'warning',
	callback: function(){}
};

export default TimeCounter;