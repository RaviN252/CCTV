import React from 'react';
import { createRoot } from 'react-dom/client'; // ✅ missing import
import './index.css';
import App from './App';

import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import store from './Frontend/Store/Store';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
