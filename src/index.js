import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './reducers';
import App from './App';
import './index.css';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

const app = (
  <Router>
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>
);


render(app, document.getElementById('app'));
