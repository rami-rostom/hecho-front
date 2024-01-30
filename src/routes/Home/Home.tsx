import { Button, Stack, Title } from '@mantine/core';
import { useAppSelector } from '../../hooks/redux';

import './Home.scss';

function Home() {
  const isLogged = useAppSelector((state) => state.login.logged);

  return (
    <>
      {!isLogged ? (
        <>
          <Stack
            justify={'center'}
            px={'xl'}
            h={'95vh'}
            pb={'5rem'}
            gap={'0rem'}
          >
            {/* Responsive view for big phone, tablet, desktop */}
            <Title
              order={1}
              ta={'center'}
              size={'12rem'}
              ff={'Gemunu Libre'}
              className="home-title"
              visibleFrom="sm"
            >
              HECHO.
            </Title>

            <Title
              order={2}
              ta={'center'}
              ff={'Gemunu Libre'}
              className="home-subtitle"
              visibleFrom="sm"
            >
              PLANIFIE. TRANSPIRE. PROFITE.
            </Title>

            {/* Responsive view for small phone */}
            <Title
              order={1}
              ta={'center'}
              size={'6rem'}
              ff={'Gemunu Libre'}
              className="home-title"
              hiddenFrom="sm"
            >
              HECHO.
            </Title>

            <Title
              order={2}
              ta={'center'}
              size={'1.2rem'}
              ff={'Gemunu Libre'}
              className="home-subtitle"
              hiddenFrom="sm"
            >
              PLANIFIE. TRANSPIRE. PROFITE.
            </Title>

            <Stack align="center" pt={'3rem'}>
              <Button
                component="a"
                href="/login"
                color="button.0"
                variant="outline"
                className="home-btn"
              >
                Se connecter
              </Button>
            </Stack>
          </Stack>
        </>
      ) : (
        <>
          <div>Hecho - Homepage</div>
          <Button color="button.0" component="a" href="/activity/create">
            Nouvelle activité
          </Button>
        </>
      )}
    </>
  );
}

export default Home;
