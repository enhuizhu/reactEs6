import React from 'react';
import Menu from './menu.jsx';
import Search from './Search.jsx';
import Login from './login.jsx';
import menuStore from '../stores/menuStore';
import shopStore from '../stores/shopStore';
import menuAction from '../actions/menuAction';
import productAction from '../actions/productAction';
import { Link, IndexLink } from 'react-router';
import userStore from '../stores/userStore';
import userAction from '../actions/userAction';
import '../../public/styles/header.scss';

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
				<ul>
					<li> <Link to="/login" activeClassName="active">Login</Link></li>
					<li><Link to="/register" activeClassName="active">Sign up</Link></li>
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
			<div className="container-fluid">
				<nav className="navbar navbar-default navbar-inverse" role="navigation">
					<div className="container-fluid">
						<div className="navbar-header">
							<a className="navbar-brand" href="/">{infoDom}</a>
						</div>
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                        <Menu data={this.state.menus}></Menu>
							<div className="nav navbar-nav navbar-right">
								<ul>
									<li><Link to="/login" activeClassName="active"><b>Login</b> </Link></li>
									<li>New here ? <Link to="/register" activeClassName="active"><b>Join Us</b></Link></li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
				<div className="container">
					<div className="form-group">
						<Search searchCallback={this.searchCallback.bind(this)}></Search>
					</div>
				</div>

			</div>
		);
	}
}

PageHeader.propTypes = {

};

PageHeader.defaultProps = {

};

export default PageHeader;

