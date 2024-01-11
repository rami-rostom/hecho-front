import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import Main from '../../components/Main/Main';

function Root() {
  const [opened, { toggle }] = useDisclosure();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding={0}
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <Header opened={opened} toggle={toggle} />
      <NavBar />
      <Main />
    </AppShell>
  );
}

export default Root;
