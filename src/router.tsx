import { createBrowserRouter } from 'react-router-dom';

import Root from './routes/Root/Root';
import Home from './routes/Home/Home';
import Activity from './routes/Activity/Activity';
import CreateActivity from './routes/CreateActivity/CreateActivity';

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
        path: '/activity',
        element: <Activity />,
      },
      {
        path: '/activity/create',
        element: <CreateActivity />,
      },
    ],
  },
]);
