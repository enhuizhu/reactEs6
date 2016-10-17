import React from 'react';

class Success extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div className="alert alert-success alert-dismissible" role="alert">
		  <button type="button" className="close" onClick={this.props.closeCallback} aria-label="Close"><span aria-hidden="true">&times;</span></button>
			{this.props.msg}
		</div>)
	}
}

Success.propTypes = {
	closeCallback: React.PropTypes.func,
	msg: React.PropTypes.string
};

Success.defaultProps = {
	closeCallback:()=>{},
	msg:''
};

export default Success;
