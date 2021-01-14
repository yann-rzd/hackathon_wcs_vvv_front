import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import ProductDetails from './Components/Product/ProductDetail';
import Product from './Components/Product/Product';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/products/' component={Product} />
        <Route exact path='/products' component={ProductDetails} />
        <Route exact path='/products/:slug' component={ProductDetails} />
      </Switch>
    </div>
  );
}

export default App;
