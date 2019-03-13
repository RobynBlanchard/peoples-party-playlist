import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store';
import ErrorBoundary from './ErrorBoundary';

import App from './components/App';

const store = createStore(window.REDUX_DATA);
delete window.REDUX_DATA;

const app = document.getElementById('app');

const jsx = (
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
);

ReactDOM.hydrate(jsx, app);
