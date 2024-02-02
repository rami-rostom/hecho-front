import { useEffect, useState } from 'react';

import { Button, Center, Container, Grid, Text, Title } from '@mantine/core';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchUserActivities } from '../../../store/reducers/getUserActivities';
import UserActivitiesCarousel from '../UserActivitiesCarousel/UserActivitiesCarousel';

import './Bento.scss';

function Bento() {
  const dispatch = useAppDispatch();

  // Retrieve user ID from state
  const id = useAppSelector((state) => state.login.data.userId);

  // Fetch and render all user activities
  useEffect(() => {
    dispatch(fetchUserActivities(id));
  }, [dispatch, id]);

  // Retrieve user activities from state
  const activitiesData = useAppSelector(
    (state) => state.getUserActivities.activity
  );

  // Filter for done activities only
  const activitiesHecho = activitiesData.filter(
    (activity) => activity.hecho === true
  );

  // Filter for planified activities
  const activitiesNoHecho = activitiesData.filter(
    (activity) => activity.hecho === false
  );

  // Filter last seven days done activties
  const [activitiesThisWeek, setActivitiesThisWeek] = useState(activitiesData);

  const filteredActivities = activitiesData.filter((activity) => {
    if (activity.date_accomplished) {
      const differenceInMs =
        Number(new Date()) - Number(new Date(activity.date_accomplished));

      const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

      return differenceInDays <= 7;
    }
  });

  useEffect(() => {
    setActivitiesThisWeek(filteredActivities);
  }, [activitiesData]);

  return (
    <>
      <Container px={'md'} py={'xl'}>
        <Title
          order={1}
          size="1.2rem"
          tt="uppercase"
          lts="0.15rem"
          fw={300}
          pb={'xl'}
        >
          Tableau de bord
        </Title>

        <Container>
          <Grid grow gutter={'xl'}>
            {/* Done activities section */}
            <Grid.Col span={4} className="bento__item" m={'md'}>
              <Title
                order={2}
                size="0.8rem"
                tt="uppercase"
                lts="0.15rem"
                fw={300}
                pb={'sm'}
              >
                Dernières activités
              </Title>

              {activitiesData.length > 0 ? (
                <UserActivitiesCarousel activities={activitiesHecho} />
              ) : (
                <Button color="button.0" component="a" href="/activity/create">
                  Nouvelle activité
                </Button>
              )}
            </Grid.Col>

            <Grid.Col span={4} className="bento__item" m={'md'}>
              <Title
                order={2}
                size="0.8rem"
                tt="uppercase"
                lts="0.15rem"
                fw={300}
                pb={'sm'}
              >
                Cette semaine
              </Title>

              <Center>
                <Text>{activitiesThisWeek.length}</Text>
              </Center>
            </Grid.Col>

            <Grid.Col span={4} className="bento__item" m={'md'}>
              3
            </Grid.Col>

            {/* Activities to do section */}
            <Grid.Col span={4} className="bento__item" m={'md'}>
              <Title
                order={2}
                size="0.8rem"
                tt="uppercase"
                lts="0.15rem"
                fw={300}
                pb={'sm'}
              >
                Activités à réaliser
              </Title>

              {activitiesData.length > 0 ? (
                <UserActivitiesCarousel activities={activitiesNoHecho} />
              ) : (
                <Button color="button.0" component="a" href="/activity/create">
                  Nouvelle activité
                </Button>
              )}
            </Grid.Col>

            <Grid.Col span={4} className="bento__item" m={'md'}>
              5
            </Grid.Col>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Bento;
