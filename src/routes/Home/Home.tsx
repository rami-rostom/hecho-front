import { Button, Stack, Title } from '@mantine/core';
import { useAppSelector } from '../../hooks/redux';

function Home() {
  const isLogged = useAppSelector((state) => state.login.logged);

  return (
    <>
      {!isLogged ? (
        <Stack
          justify={'center'}
          align={'flex-start'}
          px={'xl'}
          h={'95vh'}
          bg={'var(--mantine-color-palette-5)'}
        >
          <Title order={1} ta={'center'} size={'12rem'}>
            HECHO.
          </Title>
        </Stack>
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
