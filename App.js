import React from 'react';
import ReactDom from 'react-dom';
import Home from "./app/pages/home.jsx";
import Products from "./app/components/products.jsx";
import Product from "./app/components/product.jsx";
import NoMatch from "./app/components/NoMatch.jsx";
import { Router, Route, Link, browserHistory, hashHistory, IndexRoute} from 'react-router'

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

ReactDom.render((
  <Router history={hashHistory}>
    <Route path="/" component={Home}>
      <IndexRoute component={Products}/>
      <Route path="/products/:category" component={Products}/>
      <Route path="/product/:productId" component={Product}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('app'));



