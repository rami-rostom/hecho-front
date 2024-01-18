import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <AppShell.Main bg="palette.6">
      <Outlet />
      <Footer />
    </AppShell.Main>
  );
}

export default Main;
