import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, hashHistory } from 'react-router-dom';

import Information from './Pages/Information'; 
import Home from './Pages/Home';
import './index.css';

const appElement = document.getElementById('App');

ReactDOM.render(
  <BrowserRouter history={hashHistory}>
    <div>
      <Route exact path="/" component={Home}></Route>
      <Route path="/quiz/" component={Information}></Route>
    </div>
  </BrowserRouter>, appElement);
