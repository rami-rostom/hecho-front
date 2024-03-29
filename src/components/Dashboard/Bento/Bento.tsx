import { useEffect, useState } from 'react';

import {
  Container,
  Grid,
  RingProgress,
  Stack,
  Text,
  Title,
  em,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchUserActivities } from '../../../store/reducers/getUserActivities';
import { fetchGoal } from '../../../store/reducers/getGoal';
import { sumDurations } from '../../../utils/calculation';
import { LocalStorage } from '../../../utils/LocalStorage';

import UserActivitiesCarousel from '../UserActivitiesCarousel/UserActivitiesCarousel';
import UpdateActivityGoal from '../../Goal/UpdateActivityGoal';
import UpdateDistanceGoal from '../../Goal/UpdateDistanceGoal';
import UpdateDurationGoal from '../../Goal/UpdateDurationGoal';
import CreateActivity from '../../Activity/CreateActivity/CreateActivity';

import './Bento.scss';

function Bento() {
  const dispatch = useAppDispatch();

  const isLogged = useAppSelector((state) => state.login.logged);

  // Retrieve user datas from local storage
  const userAuth = LocalStorage.getItem('user');
  const id = userAuth.data.userId;
  const usernameSlug = userAuth.data.username_slug;

  // Fetch and render all user activities and goal if connected
  useEffect(() => {
    if (isLogged) {
      dispatch(fetchUserActivities(id));
      dispatch(fetchGoal(id));
    }
  }, [dispatch, isLogged]);

  // Boolean for responsive design
  const isMobile = useMediaQuery(`(max-width: ${em(600)})`);

  // Retrieve user goals from state
  const goalData = useAppSelector((state) => state.getGoal.goal);

  let goalActivity;
  if (goalData && goalData[0]) {
    goalActivity = goalData[0].activity;
  } else {
    goalActivity = 0;
  }

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

        <Container px={'lg'}>
          <Grid grow gutter={'xl'}>
            {/* Done activities section */}
            <Grid.Col
              span={6}
              className="bento__item"
              mx={isMobile ? 'sm' : 'md'}
              my={isMobile ? 'md' : 'md'}
            >
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
                // Component to render all done activities in a carousel
                <UserActivitiesCarousel activities={activitiesHecho} />
              ) : (
                <Stack align="center" justify="center" h={'70%'}>
                  <Text size="0.7rem" tt={'uppercase'}>
                    Aucune activité réalisée pour le moment.
                  </Text>
                  <CreateActivity />
                </Stack>
              )}
            </Grid.Col>

            {/* This week section */}
            <Grid.Col
              span={3}
              className="bento__item"
              mx={isMobile ? 'sm' : 'md'}
              my={isMobile ? 'md' : 'md'}
            >
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
            <Grid.Col
              span={3}
              className="bento__item"
              mx={isMobile ? 'sm' : 'md'}
              my={isMobile ? 'md' : 'md'}
            >
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
            <Grid.Col
              span={6}
              className="bento__item"
              mx={isMobile ? 'sm' : 'md'}
              my={isMobile ? 'md' : 'md'}
            >
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
                // Component to render all not done activities in a carousel
                <UserActivitiesCarousel activities={activitiesNoHecho} />
              ) : (
                <Stack align="center" justify="center" h={'70%'}>
                  <Text size="0.7rem" tt={'uppercase'}>
                    Aucune activité planifiée pour le moment.
                  </Text>
                  <CreateActivity />
                </Stack>
              )}
            </Grid.Col>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Bento;
