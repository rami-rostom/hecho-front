import { useEffect } from 'react';

import { Button, Container, Grid, Title } from '@mantine/core';

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
          <Grid grow gutter={'lg'}>
            <Grid.Col span={4} className="bento__item">
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

            <Grid.Col span={4} className="bento__item">
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
            </Grid.Col>

            <Grid.Col span={4} className="bento__item">
              3
            </Grid.Col>

            <Grid.Col span={4} className="bento__item">
              4
            </Grid.Col>

            <Grid.Col span={4} className="bento__item">
              5
            </Grid.Col>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Bento;
