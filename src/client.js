import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from "./store";
// import { createStore } from 'redux';
// import reducers from './reducers';

import App from './components/App';

const store = createStore(window.REDUX_DATA);

const app = document.getElementById('app');

const jsx = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.hydrate( jsx, app );
