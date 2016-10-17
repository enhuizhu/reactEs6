import React from 'react';

class Error extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div className="alert alert-danger alert-dismissible" role="alert">
		  <button type="button" className="close" onClick={this.props.closeCallback} aria-label="Close"><span aria-hidden="true">&times;</span></button>
			{this.props.msg}
		</div>)
	}
}

Error.propTypes = {
	closeCallback: React.PropTypes.func,
	msg: React.PropTypes.string
};

Error.defaultProps = {
	closeCallback:()=>{},
	msg:''
};

export default Error;
