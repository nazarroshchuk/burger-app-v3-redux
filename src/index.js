import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { history } from '../src/history';

import './index.css';
import App from './App';
import { ConnectedRouter } from "connected-react-router";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ConnectedRouter history={history}>
              <App />
          </ConnectedRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
