import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'

import App from './App';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();