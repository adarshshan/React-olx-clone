import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import Context from './store/FirebaseContext';

ReactDOM.render(
    <BrowserRouter>
        <Context>
            <App />
        </Context>
    </BrowserRouter>
    , document.getElementById('root'));
