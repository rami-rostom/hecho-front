import { createBrowserRouter } from 'react-router-dom';

import Root from './routes/Root/Root';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Activity from './routes/Activity/Activity';
import EditActivity from './routes/EditActivity/EditActivity';
import Activities from './routes/Activities/Activities';
import Register from './routes/Register/Register';

// eslint-disable-next-line import/prefer-default-export
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/activity/:id',
        element: <Activity />,
      },
      {
        path: '/activity/:id/edit',
        element: <EditActivity />,
      },
      {
        path: '/activities/user/:id',
        element: <Activities />,
      },
    ],
  },
]);
