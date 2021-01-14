import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Home from './Components/Home';
import Product from './Components/Product/Product';
import TEST from './Components/TEst/test';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Switch>
        {/* <Route exact path='/' component={Home} /> */}
        <Route path='/product' component={Product} />
        <Route exact path='/' component={TEST} />
      </Switch>
    </div>
  );
}

export default App;
