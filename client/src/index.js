import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/dx.generic.devextreme.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication } from '@azure/msal-browser';

// Sentry.io
import * as Sentry from "@sentry/react";

import Context from './context/Context';

//Sentry.io
// Sentry.init({
//     dsn: "https://d9230fcc12ca4a06a62513358f3505aa@o4504909803618304.ingest.sentry.io/4504909818036224",
//     environment: "production",
//     tracesSampleRate: 0.1,
// });

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: 'd4748929-d4e2-4c03-93e6-7e0ee180ca47',
    authority: 'https://login.microsoftonline.com/45a16466-2e3b-42e6-b0a7-01cc0cc04e57',
    redirectUri: '/',
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context>
      <App  msalInstance={msalInstance}/>
    </Context>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
