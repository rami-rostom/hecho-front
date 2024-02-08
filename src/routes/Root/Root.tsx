import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import Main from '../../components/Main/Main';
import NavBarMini from '../../components/NavBarMini/NavBarMini';

function Root() {
  const [opened, { toggle }] = useDisclosure();
  const [openedNavBar, { open, close }] = useDisclosure(false);

  // Toogle to open or reduce the navbar
  const toggleNavBar = () => {
    if (openedNavBar) {
      close();
    } else {
      open();
    }
  };

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {!openedNavBar ? (
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 220,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
          }}
          padding={0}
          transitionDuration={500}
          transitionTimingFunction="ease"
        >
          <Header opened={opened} toggle={toggle} />

          <NavBar toggleNavBar={toggleNavBar} />

          <Main />
        </AppShell>
      ) : (
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 60,
            breakpoint: 'sm',
          }}
          padding={0}
          transitionDuration={500}
          transitionTimingFunction="ease"
        >
          <Header opened={opened} toggle={toggle} />

          <NavBarMini toggleNavBar={toggleNavBar} />

          <Main />
        </AppShell>
      )}
    </>
  );
}

export default Root;
