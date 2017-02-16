import React from 'react';
import Header from '../components/pageHeader.jsx';
import Menu from '../components/menu.jsx';
import Loader from '../components/loader.jsx';
import urlService from '../services/urlService';
import menuStore from '../stores/menuStore';
import menuAction from '../actions/menuAction';



class Home extends React.Component {
	constructor(props) {
		super(props);

        this.state = {
            menus: menuStore.getMenus(),

        };
	}

    onMenuChange(menus) {
        this.setState({menus: menus});
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.activeUrl != this.props.activeUrl) {
            menuAction.setActiveUrl(nextProps.activeUrl);
        }
    }


    componentDidMount() {
        menuAction.setMenus(this.props.activeUrl);
        menuStore.addChagneListener(this.onMenuChange.bind(this));
    }

    componentWillUnmount() {
        menuStore.removeChangeListener(this.onMenuChange);
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
				<div className="container">
					<Header activeUrl={this.props.location.pathname}></Header>
                    {/*<Menu data={this.state.menus}></Menu>*/}
					<section className="main-section">
						{this.props.children}
					</section>
				</div>
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