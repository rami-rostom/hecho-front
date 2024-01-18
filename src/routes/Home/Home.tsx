import { Button } from '@mantine/core';

function Home() {
  return (
    <>
      <div>Hecho - Homepage</div>
      <Button color="button.0" component="a" href="/activity/create">
        Nouvelle activité
      </Button>
    </>
  );
}

export default Home;
