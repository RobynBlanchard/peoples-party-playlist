import express from 'express';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import Layout from './components/Layout';
import axios from 'axios';

import { StaticRouter } from 'react-router-dom'; // to mimic react router setup on server

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist'))); //serve static files to output folder

// a route to handle all non-static incoming requests, and respond with html
app.get('/*', (req, res) => {
  // debugger;

  const context = {}; // context is used for tracking potential redirects while rendering the React DOM
  const jsx = (
    <StaticRouter context={context} location={req.url}>
      <Layout />
    </StaticRouter>
  );
  const reactDom = renderToString(jsx); // converts jsx into string that will be rendered into the template

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlTemplate(reactDom));
});

app.listen(3000);

console.log(`Server listening at port 3000`);

function htmlTemplate(reactDom) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React SSR</title>
        </head>

        <body>
            <div id="app">${reactDom}</div>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}
