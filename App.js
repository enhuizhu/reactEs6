import React from 'react';
import ReactDom from 'react-dom';
import Home from "./app/pages/home.jsx";
import Products from "./app/components/products.jsx";
import Product from "./app/components/product.jsx";
import NoMatch from "./app/components/NoMatch.jsx";
import Login from "./app/components/login.jsx";
import Register from "./app/components/register.jsx";
import Checkout from "./app/components/checkout.jsx";
import { Router, Route, Link, browserHistory, hashHistory, IndexRoute} from 'react-router';

ReactDom.render((
  <Router history={hashHistory}>
    <Route path="/" component={Home}>
      <IndexRoute component={Products}/>
      <Route path="/products/:category" component={Products}/>
      <Route path="/product/:productId" component={Product}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/checkout" component={Checkout}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('app'));


