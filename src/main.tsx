import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

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
import store from './store';

// Define theme of the app with Mantine
const palette: MantineColorsTuple = [
  '#ff8906', // 0: main orange
  '#f25f4c', // 1: secondary orange-ish
  '#e53170', // 2: tertiary pink
  '#fffffe', // 3: main white
  '#a7a9be', // 4: paragraph light grey
  '#0f0e17', // 5: background dark
  '#14131c', // 6: background lighter dark
  '#2e2f3e', // 7: stroke grey
  'black', // 8: stroke black
  'black', // 9: stroke black
];

const button: MantineColorsTuple = [
  '#ff8906', // 0: main orange button
  '#e87a00', // 1: secondary orange button
  '#f25f4c', // 2: main orange-ish button
  '#ed4732', // 3: secondary orange-ish button
  '#ffba38', // 4: main yellow/orange
  '#ffb01b', // 5: secondary yellow/orange
  '#0f0e17', // 6: background dark
  '#14131c', // 7: background lighter dark
  '#2e2f3e', // 8: stroke grey
  'black', // 9: stroke black
];

const theme = createTheme({
  colors: { palette, button },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
