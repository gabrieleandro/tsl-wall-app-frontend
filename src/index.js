import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import './services/axios';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PostCollection from './posts/PostCollection'
import SignInPage from './auth/SignInPage'
import SignUpPage from './auth/SignUpPage'
import Profile from './auth/Profile'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
 
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<PostCollection />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="me" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
