'uset strict';

import React from 'react';
import basketStore from '../stores/basketStore';
import productsStore from '../stores/productsStore';
import shopStore from '../stores/shopStore';
import baketAction from '../actions/basketAction';
import productAction from '../actions/productAction';
import ProductThumbnail from '../components/productThumbnail.jsx';
import Modal from '../components/modal.jsx';
import Basket from '../components/basket.jsx';
import Search from './Search.jsx';
import Menu from '../components/menu.jsx';
import menuStore from '../stores/menuStore';
import menuAction from '../actions/menuAction';

class Products extends React.Component {
	constructor(props) {
		super(props);
		
		this.state= {
            menus: menuStore.getMenus(),
			products: [],
			title: this.props.params.category ? this.props.params.category : "Featured Food",
			total: basketStore.getTotal(),
			totalQuantity: basketStore.getTotalQuantity(),
			currency: ''
		};		
	}

	onMenuInit(menus) {
		// productAction.setProducts(this.props.params.category);
	}

	onProductsChange() {
		this.setState({
			title: this.props.params.category ? this.props.params.category.toUpperCase() : "Featured Food",
			products: productsStore.getProducts()
		});
	}

	onBasketChange() {
		this.setState({
			total: basketStore.getTotal(),
			totalQuantity: basketStore.getTotalQuantity()
		});
	}

	onShopInfoChange(shopInfo) {
		console.log('products shopInfo change:', shopInfo);
		this.setState({currency: shopInfo.currency})
	}

	componentDidMount() {
		/**
		* get currency from shopStore
		**/
		shopStore.getCurrency((currency) => {
			this.setState({currency: currency});
		});
		// shopStore.registerShopInfoChange(this.onShopInfoChange.bind(this));
		menuStore.addMenuInitListener(this.onMenuInit.bind(this));
		productsStore.addChangeListener(this.onProductsChange.bind(this));
		basketStore.addChagneListener(this.onBasketChange.bind(this));
		productAction.setProducts(this.props.params.category);
        menuAction.setMenus(this.props.activeUrl);
        menuStore.addChagneListener(this.onMenuChange.bind(this));
	}

	componentWillUnmount() {
		productsStore.removeChangeListener(this.onProductsChange);
		basketStore.removeChangeListener(this.onBasketChange);
		shopStore.removeShopInfoListener(this.onShopInfoChange);
	}

	componentWillReceiveProps(nextProps, nextState) {
        menuAction.setActiveUrl(nextProps.activeUrl);
		productAction.setProducts(nextProps.params.category);
	}

	addProduct(item) {
		baketAction.addToBasket(item);
	}

    onMenuChange(menus) {
        this.setState({menus: menus});
    }

	loadMoreProducts() {
		console.log('loadMoreProducts!');
		productAction.loadMoreProducts(this.props.params.category);
	}

	displayBasket() {
		jQuery('#basket').modal('show');
	}

    searchCallback(keyword) {
        productAction.searchProducts(keyword);
    }


    render() {
		let items = this.state.products.map((v, i) => {
			return (<div className="col-xs-12 col-sm-6 col-md-4" key={i}>
					<ProductThumbnail product={v} callback={()=> {this.addProduct(v)}}></ProductThumbnail>
			</div>);
		})
		
		let loadmoreBtn = productAction.pageInfo.currentPage >= productAction.pageInfo.totalPages ? <div></div> : <div className="btn btn-primary load-more" onClick={this.loadMoreProducts.bind(this)}>Load More</div>;

		console.log('pageInfo:', productAction.pageInfo);
		
		return (<div>
			<div>

				{/*<div className="col-xs-12 col-sm-12 col-md-12">*/}
					{/*<Menu data={this.state.menus}></Menu>*/}
				{/*</div>*/}

				<div className="col-xs-12 col-sm-12 col-md-12">
					<Search searchCallback={this.searchCallback.bind(this)}></Search>
				</div>

				<div className="col-xs-12 col-sm-12 col-md-4">
						<div className="center-block title">{this.state.title}</div>
					</div>
					<div className="col-xs-6 col-sm-3 col-md-2">
					</div>
					<div className="col-xs-6 col-sm-3 col-md-2">
					</div>
					<div className="col-xs-6 col-sm-3 col-md-2">
					</div>
					<div className="col-xs-6 col-sm-3 col-md-2">
					</div>
					<div className="col-xs-6 col-sm-3 col-md-2">
					</div>
				</div>
				<div className="clearfix"></div>

				<div className="content">
					<div>
						{items}
					</div>
					<div className="clearfix"></div>
					{loadmoreBtn}
				</div>

				{/*<div className="fix-footer">*/}
					{/*<div className="bg-primary center-block square-btn" onClick={this.displayBasket.bind(this)}>*/}
						{/*Total {this.state.currency}{this.state.total} ({this.state.totalQuantity})*/}
					{/*</div>*/}
				{/*</div>*/}

				<Modal modalId="basket" title="Basket">
				   <Basket currency={this.state.currency}></Basket>
				</Modal>
		</div>);
	}
}

Products.propTypes = {
	params: React.PropTypes.object
};

Products.defaultProps = {
	params: {}
};

export default Products;