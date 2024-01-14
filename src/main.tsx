import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {
  createTheme,
  MantineColorsTuple,
  MantineProvider,
} from '@mantine/core';
import { router } from './router';

// Mantine styles
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import './styles/index.scss';

// Define theme of the app with Mantine
const hecho: MantineColorsTuple = [
  '#fff4e2',
  '#ffe9cc',
  '#ffd09c',
  '#fdb766',
  '#fca13a',
  '#fb931d',
  '#fc8c0c',
  '#e17900',
  '#c86a00',
  '#ae5a00',
];

const darkBg: MantineColorsTuple = [
  '#0e1217',
  '#1c1f26',
  '#0e1217',
  '#0e1217',
  '#0e1217',
  '#0e1217',
  '#0e1217',
  '#0e1217',
  '#0e1217',
  '#0e1217',
];

const theme = createTheme({
  colors: { hecho, darkBg },
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
