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
            <Title
              order={1}
              ta={'center'}
              size={'12rem'}
              ff={'Gemunu Libre'}
              className="home-title"
            >
              HECHO.
            </Title>

            <Title
              order={2}
              ta={'center'}
              ff={'Gemunu Libre'}
              className="home-subtitle"
            >
              PLANIFIE. TRANSPIRE. PROFITE.
            </Title>

            <Stack align="center" pt={'3rem'}>
              <Button color="button.0" variant="outline" className="home-btn">
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
