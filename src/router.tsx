import { createBrowserRouter } from 'react-router-dom';

import Root from './routes/Root/Root';
import Home from './routes/Home/Home';

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
    ],
  },
]);
