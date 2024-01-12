import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <AppShell.Main bg="darkBg.1">
      <Outlet />
      <Footer />
    </AppShell.Main>
  );
}

export default Main;
