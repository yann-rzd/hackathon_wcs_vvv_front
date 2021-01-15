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
        <Route exact path='/products/' component={Product} />
        <Route path='/products/:duration_effect' component={Product} />
        <Route path='/product/:slug' component={ProductDetails} />
      </Switch>
    </div>
  );
}

export default App;
