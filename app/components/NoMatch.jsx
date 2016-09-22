'uset strict';

import React from 'react';

class NoMatch extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		
	}

	render() {
		return (<div className="no-match">
			This page does not exist!
		</div>);
	}
}

export default NoMatch;