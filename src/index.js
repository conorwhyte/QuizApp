import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, hashHistory } from 'react-router-dom'
import Quiz from './Pages/Quiz'
import Home from './Pages/Home'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './Reducers'
import './index.css'

const store = createStore(rootReducer)
const appElement = document.getElementById('App')

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={hashHistory}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/quiz/" component={Quiz} />
      </div>
    </BrowserRouter>
  </Provider>,
  appElement
)
