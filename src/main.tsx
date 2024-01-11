import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';
import { router } from './router';

// Mantine styles
import '@mantine/core/styles.css';

import './styles/index.scss';

// Define theme of the app with Mantine
const theme = createTheme({
  white: '#fff',
  black: '#000',
  primaryColor: 'orange',
  defaultRadius: 'sm',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
    {/* </Provider> */}
  </React.StrictMode>
);
