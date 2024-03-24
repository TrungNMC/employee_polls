import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore } from "redux";
import { Provider } from 'react-redux';
import './index.css';
import reducer from "./reducers";
import middleware from "./middleware";
import App from './components/App';

const store = createStore(reducer, middleware);


const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
