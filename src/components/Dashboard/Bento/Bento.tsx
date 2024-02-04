import { useEffect, useState } from 'react';

import {
  Button,
  Container,
  Grid,
  RingProgress,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchUserActivities } from '../../../store/reducers/getUserActivities';
import UserActivitiesCarousel from '../UserActivitiesCarousel/UserActivitiesCarousel';

import './Bento.scss';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import { sumDurations } from '../../../utils/calculation';

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

  // Animation of ring progress value for a smooth render
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue((oldValue) => {
        const newValue = oldValue + 1;

        return newValue <= 100 ? newValue : oldValue;
      });
    }, 5);

    return () => clearInterval(interval);
  }, []);

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

            {/* This week section */}
            <Grid.Col span={4} className="bento__item" m={'md'}>
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
                        {activitiesThisWeek.length}
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
                        Distance parcourue (en km)
                      </Text>
                      <Text c={'palette.0'} fw={700}>
                        {distanceThisWeek}
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

            <Grid.Col span={4} className="bento__item" m={'md'}>
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
                Activités prévues
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
