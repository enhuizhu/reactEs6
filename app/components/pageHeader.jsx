import React from 'react';

import shopStore from '../stores/shopStore';

import { Link, IndexLink } from 'react-router';
import userStore from '../stores/userStore';
import userAction from '../actions/userAction';
import '../../public/styles/header.scss';
import Menu from '../components/menu.jsx';
import menuStore from '../stores/menuStore';
import menuAction from '../actions/menuAction';



class PageHeader extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			menus: menuStore.getMenus(),
			isLogin: userStore.isLogin(),
			shopInfo: {}
		};
	}

    componentWillReceiveProps(nextProps, nextState) {
		if (nextProps.activeUrl != this.props.activeUrl) {
			menuAction.setActiveUrl(nextProps.activeUrl);
		}
	}

	componentDidMount() {
        shopStore.getShopInfo();
        shopStore.getCurrency((currency) => {
            this.setState({currency: currency});
        });
		shopStore.registerShopInfoChange(this.onShopInfoChange.bind(this));
		menuAction.setMenus(this.props.activeUrl);
		menuStore.addChagneListener(this.onMenuChange.bind(this));
		userStore.registerUserLogin(this.onUserStateChange.bind(this));
		userStore.registerUserLogout(this.onUserStateChange.bind(this));
    }

	componentWillUnmount() {
		menuStore.removeChangeListener(this.onMenuChange);
		userStore.removeUserLoginListener(this.onUserStateChange);
		userStore.removeUserLogoutListener(this.onUserStateChange);
		shopStore.removeShopInfoListener(this.onShopInfoChange);
    }

	onShopInfoChange(shopInfo) {
		console.log('page header shopInfo change');
		this.setState({shopInfo: shopInfo});
	}

	onMenuChange(menus) {
		this.setState({menus: menus});
	}

	onUserStateChange() {
		this.setState({isLogin: userStore.isLogin()});
	}

	handleLogout() {
		userAction.userLogout();
	}

    render() {
		let userStates = null;

		if (this.state.isLogin) {
			userStates = (
				<a href="javascript:void(0)" onClick={this.handleLogout.bind(this)}>Logout</a>
			);
		}else{
			userStates = (
				<ul className="nav navbar-nav navbar-right">
					<li> <Link to="/login" activeClassName="active" className="account-link">Login</Link></li>
					<li><Link to="/register" activeClassName="active" className="account-link">Sign up</Link></li>
				</ul>
			);
		}

		let infoDom = null;
		
		if (this.state.shopInfo.logo) {
			let logoPath = '/cms/uploads/' + this.state.shopInfo.logo;
			infoDom = <img src={logoPath} />;
		}else{
			infoDom = <span>{this.state.shopInfo.shopName}</span>;
		}
		return (
				<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" data-target="#navbarCollapse" data-toggle="collapse"
									className="navbar-toggle" aria-expanded="true">
								<span className="sr-only">Toggle navigation</span>
								<span className="glyphicon glyphicon-user"></span>
							</button>
								<a className="navbar-brand" href="/">{infoDom}</a>
						</div>
						<div id="navbarCollapse" className="navbar-collapse collapse" aria-expanded="true">
								{userStates}
						</div>

						<div className="container">
							<Menu data={this.state.menus}></Menu>
						</div>


					</div>
				</nav>
		);
	}
}

PageHeader.propTypes = {

};

PageHeader.defaultProps = {

};

export default PageHeader;

