import { createBrowserRouter } from 'react-router-dom';

import Root from './routes/Root/Root';
import Home from './routes/Home/Home';
import Activity from './routes/Activity/Activity';
import CreateActivity from './routes/CreateActivity/CreateActivity';
import EditActivity from './routes/EditActivity/EditActivity';

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
        path: '/activity/:id',
        element: <Activity />,
      },
      {
        path: '/activity/create',
        element: <CreateActivity />,
      },
      {
        path: '/activity/:id/edit',
        element: <EditActivity />,
      },
    ],
  },
]);
