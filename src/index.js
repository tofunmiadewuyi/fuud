import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import Home from './Landing'
import DiscoverPage from './DiscoverPage';
import ErrorBoundary from './ErrorBoundary';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "app",
    element: <App/>
            
  },
  {
    path: "discover",
    element: <DiscoverPage/>
  },
  {
    path: '*',
    element: <ErrorBoundary/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


