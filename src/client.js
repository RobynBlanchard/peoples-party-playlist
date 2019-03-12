import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store';
import ErrorBoundary from './ErrorBoundary';

import App from './components/App';

const store = createStore(window.REDUX_DATA);
console.log(window.REDUX_DATA);
delete window.REDUX_DATA;

const app = document.getElementById('app');
console.log(app);

const jsx = (
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
);

console.log(jsx);
ReactDOM.hydrate(jsx, app);
