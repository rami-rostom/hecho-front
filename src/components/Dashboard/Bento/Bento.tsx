import { useEffect, useState } from 'react';

import {
  Button,
  Container,
  Grid,
  RingProgress,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchUserActivities } from '../../../store/reducers/getUserActivities';
import { fetchGoal } from '../../../store/reducers/getGoal';
import { sumDurations } from '../../../utils/calculation';
import UserActivitiesCarousel from '../UserActivitiesCarousel/UserActivitiesCarousel';
import UpdateActivityGoal from '../../Goal/UpdateActivityGoal';
import UpdateDistanceGoal from '../../Goal/UpdateDistanceGoal';
import UpdateDurationGoal from '../../Goal/UpdateDurationGoal';

import './Bento.scss';

function Bento() {
  const dispatch = useAppDispatch();

  // Retrieve user ID and slug from state
  const id = useAppSelector((state) => state.login.data.userId);

  const usernameSlug = useAppSelector(
    (state) => state.login.data.username_slug
  );

  // Fetch and render all user activities
  useEffect(() => {
    dispatch(fetchUserActivities(id));
  }, [dispatch, id]);

  // Fetch user goal
  useEffect(() => {
    dispatch(fetchGoal(id));
  }, [dispatch, id]);

  // Retrieve user goals from state
  const goalData = useAppSelector((state) => state.getGoal.goal);
  const goalActivity = goalData && goalData[0] ? goalData[0].activity : 0;

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

  const nbActivitiesThisWeek = activitiesThisWeek.length;

  // Calculation number of km done this week
  let distanceThisWeek = 0;

  for (const activity of activitiesThisWeek) {
    let distance = activity.distance;
    distanceThisWeek += Number(distance);
  }

  // Calculation duration done this week
  let durationThisWeek = '00:00:00';

  for (const activity of activitiesThisWeek) {
    let duration = activity.duration;
    durationThisWeek = sumDurations(durationThisWeek, duration);
  }

  // Calculation percentage of done activities compare to goal
  const percentageDoneActivityWithGoal =
    (nbActivitiesThisWeek * 100) / goalActivity;
  const compareToGoalValue = Number(percentageDoneActivityWithGoal.toFixed(0));

  // Animation of ring progress value for a smooth render
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue((oldValue) => {
        const newValue = oldValue + 1;

        return newValue <= compareToGoalValue ? newValue : oldValue;
      });
    }, 5);

    return () => clearInterval(interval);
  }, [compareToGoalValue, activitiesData]);

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
            <Grid.Col span={6} className="bento__item" m={'md'}>
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

              {activitiesHecho.length > 0 ? (
                <UserActivitiesCarousel activities={activitiesHecho} />
              ) : (
                <Stack align="center" justify="center" h={'70%'}>
                  <Text size="0.7rem" tt={'uppercase'}>
                    Aucune activité réalisée pour le moment.
                  </Text>
                  <Button
                    color="button.0"
                    size="compact-xs"
                    variant="outline"
                    component="a"
                    href="/activity/create"
                  >
                    Nouvelle activité
                  </Button>
                </Stack>
              )}
            </Grid.Col>

            {/* This week section */}
            <Grid.Col span={2} className="bento__item" m={'md'}>
              {/* Number of hecho activities */}
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

              <Stack justify="center" h={'85%'}>
                <Stack align="center" gap={0}>
                  <Text
                    size="0.7rem"
                    tt={'uppercase'}
                    component="a"
                    href={`/activities/user/${usernameSlug}`}
                  >
                    Activités HECHO
                  </Text>

                  <RingProgress
                    roundCaps
                    sections={[
                      {
                        value: animatedValue,
                        color: 'var(--mantine-color-palette-0)',
                      },
                    ]}
                    label={
                      <Text c="palette.0" fw={700} ta="center" size="xl">
                        {nbActivitiesThisWeek}
                      </Text>
                    }
                  />
                </Stack>

                {/* Distance and duration done this week */}
                <Carousel controlSize={15} loop>
                  <Carousel.Slide>
                    <Stack align="center" gap={0}>
                      <Text
                        size="0.7rem"
                        tt={'uppercase'}
                        component="a"
                        href={`/activities/user/${usernameSlug}`}
                      >
                        Distance parcourue
                      </Text>
                      <Text c={'palette.0'} fw={700}>
                        {distanceThisWeek} km
                      </Text>
                    </Stack>
                  </Carousel.Slide>

                  <Carousel.Slide>
                    <Stack align="center" gap={0}>
                      <Text
                        size="0.7rem"
                        tt={'uppercase'}
                        component="a"
                        href={`/activities/user/${usernameSlug}`}
                      >
                        Durée d'activités
                      </Text>
                      <Text c={'palette.0'} fw={700}>
                        {durationThisWeek}
                      </Text>
                    </Stack>
                  </Carousel.Slide>
                </Carousel>
              </Stack>
            </Grid.Col>

            {/* Weekly goal section */}
            <Grid.Col span={2} className="bento__item" m={'md'}>
              <Title
                order={2}
                size="0.8rem"
                tt="uppercase"
                lts="0.15rem"
                fw={300}
                pb={'sm'}
              >
                Objectif hebdomadaire
              </Title>

              <Stack align="center" justify="center" h={'85%'}>
                <Stack align="center" gap={'0rem'}>
                  <Text size="0.7rem" tt={'uppercase'}>
                    Nombre d'activités
                  </Text>

                  {/* Component to render goal activity and update it */}
                  <UpdateActivityGoal userId={id} />
                </Stack>

                <Stack align="center" gap={'0rem'}>
                  <Text size="0.7rem" tt={'uppercase'}>
                    Distance à parcourir
                  </Text>

                  {/* Component to render goal distance and update it */}
                  <UpdateDistanceGoal userId={id} />
                </Stack>

                <Stack align="center" gap={'0rem'}>
                  <Text size="0.7rem" tt={'uppercase'}>
                    Durée à réaliser
                  </Text>

                  {/* Component to render goal distance and update it */}
                  <UpdateDurationGoal userId={id} />
                </Stack>
              </Stack>
            </Grid.Col>

            {/* Activities to do section */}
            <Grid.Col span={6} className="bento__item" m={'md'}>
              <Title
                order={2}
                size="0.8rem"
                tt="uppercase"
                lts="0.15rem"
                fw={300}
                pb={'sm'}
              >
                Activités prévues
              </Title>

              {activitiesNoHecho.length > 0 ? (
                <UserActivitiesCarousel activities={activitiesNoHecho} />
              ) : (
                <Stack align="center" justify="center" h={'70%'}>
                  <Text size="0.7rem" tt={'uppercase'}>
                    Aucune activité planifiée pour le moment.
                  </Text>
                  <Button
                    color="button.0"
                    size="compact-xs"
                    variant="outline"
                    component="a"
                    href="/activity/create"
                  >
                    Nouvelle activité
                  </Button>
                </Stack>
              )}
            </Grid.Col>

            {/* <Grid.Col span={4} className="bento__item" m={'md'}>
              5
            </Grid.Col> */}
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Bento;
