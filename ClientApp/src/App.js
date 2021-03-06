﻿import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Cart from './components/Cart';
import Item from './components/Item';
import Dashboard from './components/Dashboard';
import SendEmail from './components/SendEmail';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/cart' component={Cart} />
    <Route path='/item/:id' component={Item} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/send-email' component={SendEmail} />
  </Layout>
);
