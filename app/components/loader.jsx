import React from 'react';
import loaderStore from '../stores/loaderStore';

class Loader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: loaderStore.isLoading()
		};
	}

	componentDidMount() {
		loaderStore.registerStatusChange(this.onStatusChange.bind(this));
	}

	componentWillUnmount() {
		loaderStore.removeListener(this.onStatusChange);
	}

	onStatusChange() {
		this.setState({
			isLoading: loaderStore.isLoading()
		})
	}

	render() {
		if (!loaderStore.isLoading()) {
			return <div></div>;
		}

		return (<div className="loader">
			<div className='square'>
			</div>
		</div>);
	}
}

Loader.propTypes = {
};

Loader.defaultProps = {
};

export default Loader;