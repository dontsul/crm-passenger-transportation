import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { EditUsers } from './pages/EditUsers';
import { Registration } from './pages/Registration';
import { Authorization } from './pages/Authorization';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Trips } from './pages/Trips';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/edit',
        element: <EditUsers />,
      },
      {
        path: '/registration',
        element: <Registration />,
      },
      {
        path: '/authorization',
        element: <Authorization />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
      {
        path: '/trips',
        element: <Trips />,
      },
    ],
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
