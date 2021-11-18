import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyApyV8g9LK9uUnJMzgFT4b_JsBdpFhgyT8",
  authDomain: "covid-tracker-27c2b.firebaseapp.com",
  projectId: "covid-tracker-27c2b",
  storageBucket: "covid-tracker-27c2b.appspot.com",
  messagingSenderId: "497709548794",
  appId: "1:497709548794:web:0be82ea55e46bd50d9f543",
  measurementId: "G-3P38BV2BEV"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
