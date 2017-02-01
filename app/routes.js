'use strict'

import React from 'react';
import Products from '../app/components/products.jsx';
import Product from '../app/components/product.jsx';
import NoMatch from '../app/components/NoMatch.jsx';
import Login from '../app/components/login.jsx';
import Register from '../app/components/register.jsx';
import Checkout from '../app/components/checkout.jsx';
import Home from './pages/home.jsx';
import { Route, IndexRoute} from 'react-router';

export default (
    <Route path="/" component={Home}>
        <IndexRoute component={Products}/>
        <Route path="/products/:category" component={Products}/>
        <Route path="/product/:productId" component={Product}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/checkout" component={Checkout}/>
        <Route path="*" component={NoMatch}/>
    </Route>
);