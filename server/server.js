import cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from 'body-parser';

import createStore from '../src/store';
import router from './router';

const app = express();

app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
app.use(bodyParser.json({ type: '*/*' }))
app.use(cookieParser());
app.use(express.static('public'));

const store = createStore();

router(app, store);

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening at port 3000`);
