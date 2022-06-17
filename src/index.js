import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { NavLink } from 'react-router-dom'
import Routing from './Routing/Routing';
import Header from './Routing/Header';
import Profile from './Profile/Profile';
import Jobs from './Jobs/Jobs';
import Register from './Register/Register';
import Login from './Login/Login';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import '../node_modules/@fortawesome/free-solid-svg-icons/faSpinner'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    
    <BrowserRouter>
    <Routing/>
    
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
