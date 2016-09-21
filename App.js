import React from 'react';
import ReactDom from 'react-dom';
import Products from "./app/components/Product.jsx";
import Home from "./app/pages/home.jsx";
import productsStore from "./app/stores/productsStore.js";
import productActions from "./app/actions/productAction.js";

/**
* register store change events
**/
// let config = {products: []};

// productsStore.addChangeListener((products) => {
// 	config.products = products;
// });

// productActions.setProducts().then((products) => {
		
// }).catch((e) => {

// });

ReactDom.render(<Home/>, document.getElementById('app'));



