import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useAppSelector } from '../../hooks/redux';

function Main() {
  const isLogged = useAppSelector((state) => state.login.logged);

  return (
    <>
      {!isLogged ? (
        <AppShell.Main bg="palette.5">
          <Outlet />
          {/* <Footer /> */}
        </AppShell.Main>
      ) : (
        <AppShell.Main bg="palette.6">
          <Outlet />
          {/* <Footer /> */}
        </AppShell.Main>
      )}
    </>
  );
}

export default Main;
