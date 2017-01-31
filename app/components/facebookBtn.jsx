import React from 'react';
//import FacebookLogin from 'react-facebook-login';

class FacebookBtn extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
    		</div>
		);
	}
}


FacebookBtn.propTypes = {
	callback: React.PropTypes.func
};

FacebookBtn.defaultProps = {
	callback: ()=>{}
};

export default FacebookBtn;