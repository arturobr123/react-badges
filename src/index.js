import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './global.css';

import App from './components/App';

const name = "Arturo"
const element = <h1>Hello, {name}</h1>;
const container = document.getElementById('app');

// ReactDOM.render(__qué__, __dónde__);
ReactDOM.render(
  <App /> ,
  container
);
