'use strict'

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './app/routes';
import './public/styles/main.scss';

render (
    <Router history={browserHistory} routes={routes}/>,
    document.getElementById('app')
);