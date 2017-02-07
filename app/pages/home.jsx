import React from 'react';
import Header from '../components/pageHeader.jsx';
import Loader from '../components/loader.jsx';
import urlService from '../services/urlService';


class Home extends React.Component {
	constructor(props) {
		super(props);
	}
	
	componentWillReceiveProps(nextProps) {
		let route = this.props.location.pathname;

		if (route === '/login' || route === '/register') {
			route = '/';
		}

		urlService.updatePreUrl(route);
	}
	
	render() {
		return (<div>
			<body>
				<div className="container">
					<Header activeUrl={this.props.location.pathname}></Header>
					<section className="main-section">
						{this.props.children}
					</section>
				</div>
			</body>
			<footer className="footer">
				<div className="container">
			        <p className="text-muted">Online marketing solution</p>
			    </div>
			</footer>
			<Loader></Loader>
		</div>);
	}
}

export default Home;