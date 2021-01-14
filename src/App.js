import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Product from './Components/Product/Product';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/products/:slug' component={Product} />
      </Switch>
    </div>
  );
}

export default App;
