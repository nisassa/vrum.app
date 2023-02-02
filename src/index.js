import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/style.css';
import './charts/ChartjsConfig';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

if (localStorage.getItem('sidebar-expanded') == 'true') {
  document.querySelector('body').classList.add('sidebar-expanded');
} else {
  document.querySelector('body').classList.remove('sidebar-expanded');
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
