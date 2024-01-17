import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBike,
  IconMountain,
  IconRun,
  IconSwimming,
  IconTrekking,
} from '@tabler/icons-react';

import Hecho from '../../components/Hecho/Hecho';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchActivity } from '../../store/reducers/activity';

import './Activity.scss';

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

  /**
   * Function for calculating the pace of activity
   * @param duration value in minutes
   * @param distance value in kilometers
   * @returns Return pace in km/h
   */
  const paceCalcul = (duration: number, distance: number) => {
    const distanceInMeter = distance * 1000;
    const durationInSeconds = duration * 60;

    const paceResult = (distanceInMeter / durationInSeconds) * 3.6;

    // Return result with two decimals
    return paceResult.toFixed(2);
  };

  // Activity pace calculation
  const pace = paceCalcul(activityData.duration, activityData.distance);

  const { steps } = activityData;

  return (
    <Container p="md" className="activity">
      <Container px="-1rem" className="activity__banner">
        <Text tt="uppercase" lts="0.15rem" pb="xs" fw={300}>
          Activité
        </Text>
        <Group justify="space-between">
          <Group>
            {/* Dynamic icon based on sport */}
            {activityData.sport.id === 1 && (
              <IconRun size="3rem" className="activity__banner-icon" />
            )}
            {activityData.sport.id === 2 && (
              <IconMountain size="3rem" className="activity__banner-icon" />
            )}
            {activityData.sport.id === 3 && (
              <IconBike size="3rem" className="activity__banner-icon" />
            )}
            {activityData.sport.id === 4 && (
              <IconSwimming size="3rem" className="activity__banner-icon" />
            )}
            {activityData.sport.id === 5 && (
              <IconTrekking size="3rem" className="activity__banner-icon" />
            )}
            <Title order={1}>{activityData.name}</Title>
          </Group>
          <Button color="hecho.9">Modifier l&apos;activité</Button>
        </Group>
      </Container>

      <Container>
        <Flex justify="space-between">
          <Stack align="stretch" gap="xl">
            {steps
              ? steps.map((step) => (
                  <Flex direction="column" gap="xs" key={step.id}>
                    <Text tt="capitalize">{step.name}</Text>

                    <SimpleGrid
                      cols={{ base: 1, lg: 3 }}
                      spacing={{ base: 'xs', lg: '6rem' }}
                    >
                      <Stack gap="0rem">
                        <Text fw={700}>{step.duration} min</Text>
                        <Text size="xs" fs="italic">
                          Temps total
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
                          {paceCalcul(
                            Number(step.duration),
                            Number(step.distance)
                          )}{' '}
                          km/h
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

          <Stack>
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
              {pace ? (
                <Text fw={500}>{pace} km/h</Text>
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
