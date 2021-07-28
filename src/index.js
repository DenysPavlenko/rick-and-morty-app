import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Store
import store from 'redux/store';
// Components
import App from './App';
// Styles
import './index.sass';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
