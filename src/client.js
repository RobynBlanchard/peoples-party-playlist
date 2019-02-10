import ReactDOM from 'react-dom';
import React from 'react';
import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom';

const app = document.getElementById('app');
ReactDOM.hydrate(
  <BrowserRouter>
  <Layout />
  </BrowserRouter>, app); // uses the SSR react app and will attach event handlers
