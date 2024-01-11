import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';

import App from './components/App/App';

// Mantine styles
import '@mantine/core/styles.css';

import './styles/index.scss';

// Define theme of the app with Mantine
const theme = createTheme({
  white: '#fff',
  black: '#000',
  primaryColor: 'indigo',
  defaultRadius: 'sm',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <App />
    </MantineProvider>
    {/* </Provider> */}
  </React.StrictMode>
);
