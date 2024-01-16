import { Button } from '@mantine/core';

function Home() {
  return (
    <>
      <div>Hecho - Homepage</div>
      <Button color="hecho.6" component="a" href="/activity/create">
        Nouvelle activité
      </Button>
    </>
  );
}

export default Home;
