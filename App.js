import React from 'react';
import ReactDom from 'react-dom';
import Products from "./app/components/Product.jsx";
import productsStore from "./app/stores/productsStore.js";
import productActions from "./app/actions/productAction.js";

/**
* register store change events
**/
let config = {products: []};

productsStore.addChangeListener((products) => {
	config.products = products;
	ReactDom.render(<Products config={config}/>, document.getElementById('app'));
});

productActions.setProducts().then((products) => {
		
}).catch((e) => {

});


