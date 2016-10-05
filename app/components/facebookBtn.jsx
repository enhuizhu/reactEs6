import React from 'react';

class FacebookBtn extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="facebook facebook-bg center-block square-btn">
				Login With Facebook	
			</div>
		);
	}
}


FacebookBtn.propTypes = {

};

FacebookBtn.defaultProps = {

};

export default FacebookBtn;