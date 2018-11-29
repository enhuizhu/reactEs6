import React from 'react';
import Menu from './menu.jsx';
import Search from './Search.jsx';
import menuStore from '../stores/menuStore';
import shopStore from '../stores/shopStore';
import menuAction from '../actions/menuAction';
import productAction from '../actions/productAction';
import {Link} from 'react-router';
import userStore from '../stores/userStore';
import userAction from '../actions/userAction';

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

	searchCallback(keyword) {
		productAction.searchProducts(keyword);
	}

	render() {
		let userStates = null;

		if (this.state.isLogin) {
			userStates = (
				<a href="javascript:void(0)" onClick={this.handleLogout.bind(this)}>Logout</a>
			);
		}else{
			userStates = (						
				<span>
					<Link to="/login">Login</Link>&nbsp;
					<Link to="/register">Sign up</Link>
				</span>
			);
		}

		let infoDom = null;
		
		if (this.state.shopInfo.logo) {
			let logoPath = `${config.apiPath}/uploads/${this.state.shopInfo.logo}`;
			infoDom = <img src={logoPath}/>;
		}else{
			infoDom = <span>{this.state.shopInfo.shopName}</span>;
		}
		
		return (
			<header>
				<h4>
					{infoDom}
					<span className="pull-right">
						{userStates}
					</span>
				</h4>
				<div className="clearfix"></div>
				<Search searchCallback={this.searchCallback.bind(this)}></Search>
				<Menu data={this.state.menus}></Menu>
			</header>
		);
	}
}

PageHeader.propTypes = {

};

PageHeader.defaultProps = {

};

export default PageHeader;

