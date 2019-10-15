import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';

import routes from '../src/routes';
import App from '../src/components/App';
import htmlTemplate from './htmlTemplate';
import { logInSucess, assignUser } from '../src/actions';

export default (app, store) => {
  app.get('/*', (req, res) => {
    const context = {};

    // fix - happens on every request eg all requests for images
    const token = req.cookies.spotifyAccessToken;
    if (token) {
      store.dispatch(logInSucess(token));
    }

    const userId = req.cookies.userId;
    if (userId) {
      store.dispatch(assignUser(userId));
    }

    const sheet = new ServerStyleSheet();

    const dataRequirements = routes
      .filter(route => matchPath(req.path, route))
      .map(route => route.component)
      .filter(comp => comp.serverFetch)
      .map(comp => {
        return store.dispatch(comp.serverFetch());
      });

    Promise.all(dataRequirements).then(() => {
      const jsx = (
        <Provider store={store}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </Provider>
      );
      const reactDom = renderToString(sheet.collectStyles(jsx));
      const reduxState = store.getState();
      const styles = sheet.getStyleTags();

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(htmlTemplate(reactDom, styles, reduxState));
    });
  });
};
