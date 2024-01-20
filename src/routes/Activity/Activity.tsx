import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IconRepeat } from '@tabler/icons-react';
import {
  Badge,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';

import ActivityIcon from '../../components/ActivityIcon/ActivityIcon';
import Hecho from '../../components/Hecho/Hecho';
import AddStep from '../../components/AddStep/AddStep';
import RemoveStep from '../../components/RemoveStep/RemoveStep';
import DeleteActivity from '../../components/DeleteActivity/DeleteActivity';

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

  const speed = speedCalcul(activityData.duration, activityData.distance);

  /**
   * Function for calculating the pace of activity
   * @param duration value in minutes
   * @param distance value in kilometers
   * @returns Return pace in min/km
   */
  const paceCalcul = (duration: number, distance: number) => {
    const paceResult = duration / distance;

    // Return result with two decimals
    return paceResult.toFixed(2);
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
            {/* Component for dynamic icon based on sport */}
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
          <Group gap="xs">
            <Button
              size="compact-xs"
              color="button.0"
              variant="outline"
              component="a"
              href={`/activity/${id}/edit`}
            >
              Modifier activité
            </Button>
            <DeleteActivity />
          </Group>
        </Group>
      </Container>

      <Container className="activity__main">
        <Flex justify="space-between">
          <Stack align="stretch" gap="xl" className="activity__steps">
            {/* List of steps or none if no steps in the activity */}
            {steps
              ? steps.map((step) => (
                  <Flex
                    direction="column"
                    gap="xs"
                    key={step.id}
                    className="activity__steps-step"
                  >
                    <Group justify="space-between">
                      <Text tt="capitalize" size="xl" fw={700}>
                        {step.name}
                      </Text>
                      <Group>
                        <UnstyledButton>Modifier étape</UnstyledButton>
                        {/* Component opening a modal to remove the step from the activity */}
                        <RemoveStep stepId={step.id} />
                      </Group>
                    </Group>

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

            <Group justify="flex-end" gap="xs">
              {/* Component button and modal to create a new step */}
              <AddStep />

              <Button color="button.4" size="compact-xs" variant="outline">
                <IconRepeat size="0.9rem" className="activity__steps-button" />
                Ajouter une répétition
              </Button>
            </Group>
          </Stack>

          <Stack className="activity__aside">
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
              {speed === 'NaN' ? (
                <Text fw={500}>--</Text>
              ) : (
                <Text fw={500}>{speed} km/h</Text>
              )}
              <Text size="xs" fs="italic">
                Vitesse moyenne
              </Text>
            </Stack>

            <Stack gap="0rem">
              {pace === 'NaN' ? (
                <Text fw={500}>--</Text>
              ) : (
                <Text fw={500}>{pace} min/km</Text>
              )}
              <Text size="xs" fs="italic">
                Allure
              </Text>
            </Stack>

            <Divider my="0.3rem" />

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
              <Button color="button.0">HECHO</Button>
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
