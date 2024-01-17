import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Badge,
  Button,
  Container,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';

import Hecho from '../../components/Hecho/Hecho';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchActivity } from '../../store/reducers/activity';

import './Activity.scss';
import ActivityIcon from '../../components/ActivityIcon/ActivityIcon';

function Activity() {
  const dispatch = useAppDispatch();

  // Retrieve ID of the activity
  const { id } = useParams();
  if (!id) throw new Error('Invalid id');

  // Render activity page using ID and fetchActivity function
  useEffect(() => {
    dispatch(fetchActivity(id));
  }, [dispatch, id]);

  const activityData = useAppSelector((state) => state.activity.activity);

  const { steps, tags } = activityData;

  /**
   * Function for calculating the speed of activity
   * @param duration value in minutes
   * @param distance value in kilometers
   * @returns Return speed in km/h
   */
  const speedCalcul = (duration: number, distance: number) => {
    const distanceInMeter = distance * 1000;
    const durationInSeconds = duration * 60;

    const speedResult = (distanceInMeter / durationInSeconds) * 3.6;

    // Return result with two decimals
    return speedResult.toFixed(2);
  };

  // Activity speed calculation
  const speed = speedCalcul(activityData.duration, activityData.distance);

  const paceCalcul = (duration: number, distance: number) => {
    const paceResult = duration / distance;

    return paceResult;
  };

  const pace = paceCalcul(activityData.duration, activityData.distance);

  return (
    <Container p="md" className="activity">
      <Container px="-1rem" className="activity__banner">
        <Text tt="uppercase" lts="0.15rem" pb="xs" fw={300}>
          Activité
        </Text>
        <Group justify="space-between">
          <Group gap="1rem">
            {/* Dynamic icon based on sport */}
            <ActivityIcon />
            <Title order={1}>{activityData.name}</Title>
            {tags
              ? tags.map((tag) => (
                  <Badge
                    variant="gradient"
                    gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                    key={tag.id}
                  >
                    {tag.name}
                  </Badge>
                ))
              : []}
          </Group>
          <Button color="hecho.9">Modifier l&apos;activité</Button>
        </Group>
      </Container>

      <Container>
        <Flex justify="space-between">
          <Stack align="stretch" gap="xl" className="activity__steps">
            {steps
              ? steps.map((step) => (
                  <Flex
                    direction="column"
                    gap="xs"
                    key={step.id}
                    className="activity__steps-step"
                  >
                    <Text tt="capitalize" size="xl" fw={700}>
                      {step.name}
                    </Text>

                    <SimpleGrid
                      cols={{ base: 2, lg: 4 }}
                      spacing={{ base: 'xs', lg: 'xs' }}
                    >
                      <Stack gap="0rem">
                        <Text fw={700}>{step.duration} min</Text>
                        <Text size="xs" fs="italic">
                          Temps
                        </Text>
                      </Stack>

                      <Stack gap="0rem">
                        <Text fw={700}>{step.distance} km</Text>
                        <Text size="xs" fs="italic">
                          Distance estimée
                        </Text>
                      </Stack>

                      <Stack gap="0rem">
                        <Text fw={700}>
                          {/* Calculation of pace step */}
                          {speedCalcul(
                            Number(step.duration),
                            Number(step.distance)
                          )}{' '}
                          km/h
                        </Text>
                        <Text size="xs" fs="italic">
                          Vitesse moyenne
                        </Text>
                      </Stack>

                      <Stack gap="0rem">
                        <Text fw={700}>
                          {/* Calculation of pace step */}
                          {paceCalcul(
                            Number(step.duration),
                            Number(step.distance)
                          )}{' '}
                          min/km
                        </Text>
                        <Text size="xs" fs="italic">
                          Allure
                        </Text>
                      </Stack>
                    </SimpleGrid>
                  </Flex>
                ))
              : []}
          </Stack>

          <Stack className="activity__detail">
            <Stack gap="0rem">
              <Text fw={500} tt="uppercase">
                {activityData.sport.name}
              </Text>
              <Text size="xs" fs="italic">
                Type
              </Text>
            </Stack>

            <Stack gap="0rem">
              <Text fw={500}>{activityData.duration} min</Text>
              <Text size="xs" fs="italic">
                Temps total
              </Text>
            </Stack>

            <Stack gap="0rem">
              <Text fw={500}>{activityData.distance} km</Text>
              <Text size="xs" fs="italic">
                Distance
              </Text>
            </Stack>

            <Stack gap="0rem">
              {speed ? (
                <Text fw={500}>{speed} km/h</Text>
              ) : (
                <Text fw={500}>--</Text>
              )}
              <Text size="xs" fs="italic">
                Vitesse moyenne
              </Text>
            </Stack>

            <Stack gap="0rem">
              {pace ? (
                <Text fw={500}>{pace} min/km</Text>
              ) : (
                <Text fw={500}>--</Text>
              )}
              <Text size="xs" fs="italic">
                Allure
              </Text>
            </Stack>

            <Stack gap="0rem">
              <Text fw={500}>{activityData.date_scheduled}</Text>
              <Text size="xs" fs="italic">
                Date prévue
              </Text>
            </Stack>

            <Stack gap="0rem">
              {activityData.date_accomplished ? (
                <Text fw={500}>{activityData.date_accomplished}</Text>
              ) : (
                <Text fw={500}>À réaliser</Text>
              )}
              <Text size="xs" fs="italic">
                Date accomplissement
              </Text>
            </Stack>

            {activityData.hecho ? (
              <Button color="hecho.6">HECHO</Button>
            ) : (
              // Component to update accomplished date and tag the activity as HECHO
              <Hecho />
            )}
          </Stack>
        </Flex>
      </Container>
    </Container>
  );
}

export default Activity;