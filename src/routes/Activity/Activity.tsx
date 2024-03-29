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
  em,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import ActivityIcon from '../../components/Activity/ActivityIcon/ActivityIcon';
import HechoBtn from '../../components/Hecho/HechoBtn/HechoBtn';
import AddStep from '../../components/Step/AddStep/AddStep';
import RemoveStep from '../../components/Step/RemoveStep/RemoveStep';
import DeleteActivity from '../../components/Activity/DeleteActivity/DeleteActivity';
import DuplicateStep from '../../components/Step/DuplicateStep/DuplicateStep';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchActivity } from '../../store/reducers/getActivity';
import {
  speedCalcul,
  convertDateFormat,
  convertDurationToMin,
  paceCalcul,
} from '../../utils/calculation';

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

  const activityData = useAppSelector((state) => state.getActivity.activity);
  const { steps, tags } = activityData;

  const speed = speedCalcul(
    Number(convertDurationToMin(activityData.duration)),
    activityData.distance
  );
  const pace = paceCalcul(activityData.duration, activityData.distance);

  // Function who render true or false if one of the step has an empty duration or distance value
  const emptyPaceAndSpeed = activityData.steps.find(
    (step) => step.duration === '' || step.distance === null
  );

  // Boolean for responsive design
  const isMobile = useMediaQuery(`(max-width: ${em(600)})`);

  return (
    <Container py="xl" className="activity">
      <Container px="-1rem" className="activity__banner">
        <Title
          order={1}
          size="1.2rem"
          tt="uppercase"
          lts="0.15rem"
          pb="md"
          fw={300}
        >
          Activité
        </Title>
        <Group justify="space-between">
          <Group gap="1rem">
            {/* Component for dynamic icon based on sport */}
            <ActivityIcon />
            <Title size={isMobile ? '1.5rem' : '2rem'} order={1}>
              {activityData.name}
            </Title>
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
              color="button.4"
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
        <Flex
          justify="space-between"
          gap={'xl'}
          direction={isMobile ? 'column' : 'row'}
        >
          <Stack
            align="stretch"
            w={'100%'}
            mr={isMobile ? '0rem' : '3rem'}
            gap={isMobile ? 'lg' : 'xl'}
            className="activity__steps"
          >
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
                      <Group align="flex-start">
                        {/* Component to duplicate the step */}
                        <DuplicateStep
                          stepName={step.name}
                          stepDuration={step.duration.toString()}
                          stepDistance={step.distance}
                          activityDuration={activityData.duration.toString()}
                          activityDistance={activityData.distance}
                        />
                        {/* Component opening a modal to remove the step from the activity */}
                        <RemoveStep
                          stepId={step.id}
                          stepDistance={step.distance}
                          stepDuration={step.duration.toString()}
                          activityDuration={activityData.duration.toString()}
                          activityDistance={activityData.distance}
                        />
                      </Group>
                    </Group>

                    <SimpleGrid
                      cols={{ base: 2, lg: 4 }}
                      spacing={{ base: 'xs', lg: 'xs' }}
                    >
                      {/* Render step when user select only distance type */}
                      {step.distance && !step.duration && (
                        <>
                          <Stack gap="0rem">
                            <Text fw={700}>--</Text>
                            <Text size="xs" fs="italic">
                              Durée
                            </Text>
                          </Stack>

                          <Stack gap="0rem">
                            <Text fw={700}>{step.distance} km</Text>
                            <Text size="xs" fs="italic">
                              Distance estimée
                            </Text>
                          </Stack>

                          <Stack gap="0rem">
                            <Text fw={700}>--</Text>
                            <Text size="xs" fs="italic">
                              Vitesse moyenne
                            </Text>
                          </Stack>

                          <Stack gap="0rem">
                            <Text fw={700}>--</Text>
                            <Text size="xs" fs="italic">
                              Allure
                            </Text>
                          </Stack>
                        </>
                      )}

                      {/* Render step when user select only duration type */}
                      {step.duration && step.distance == null && (
                        <>
                          <Stack gap="0rem">
                            <Text fw={700}>{step.duration}</Text>
                            <Text size="xs" fs="italic">
                              Durée
                            </Text>
                          </Stack>

                          <Stack gap="0rem">
                            <Text fw={700}>--</Text>
                            <Text size="xs" fs="italic">
                              Distance estimée
                            </Text>
                          </Stack>

                          <Stack gap="0rem">
                            <Text fw={700}>--</Text>
                            <Text size="xs" fs="italic">
                              Vitesse moyenne
                            </Text>
                          </Stack>

                          <Stack gap="0rem">
                            <Text fw={700}>--</Text>
                            <Text size="xs" fs="italic">
                              Allure
                            </Text>
                          </Stack>
                        </>
                      )}

                      {/* Render step when user select duration and distance type */}
                      {step.duration && step.distance != null && (
                        <>
                          <Stack gap="0rem">
                            <Text fw={700}>{step.duration}</Text>
                            <Text size="xs" fs="italic">
                              Durée
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
                                Number(convertDurationToMin(step.duration)),
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
                                step.duration,
                                Number(step.distance)
                              )}{' '}
                              min/km
                            </Text>
                            <Text size="xs" fs="italic">
                              Allure
                            </Text>
                          </Stack>
                        </>
                      )}
                    </SimpleGrid>
                  </Flex>
                ))
              : []}

            <Group justify="flex-end" gap="xs">
              {/* Component button and modal to create a new step */}
              {activityData.duration === null ? (
                <AddStep
                  activityDuration={'00:00:00'}
                  activityDistance={activityData.distance}
                />
              ) : (
                <AddStep
                  activityDuration={activityData.duration}
                  activityDistance={activityData.distance}
                />
              )}

              {/* <Button color="button.4" size="compact-xs" variant="outline">
                <IconRepeat size="0.9rem" className="activity__steps-button" />
                Ajouter une répétition
              </Button> */}
            </Group>
          </Stack>

          {/* Aside section responsive render if not a mobile */}
          {!isMobile && (
            <Stack className="activity__aside" w={'15%'}>
              <Stack gap="0rem">
                <Text fw={500} tt="uppercase">
                  {activityData.sport.name}
                </Text>
                <Text size="xs" fs="italic">
                  Type
                </Text>
              </Stack>

              {activityData.duration === null ||
              activityData.duration === '00:00:00' ? (
                <Stack gap="0rem">
                  <Text fw={500}>--</Text>
                  <Text size="xs" fs="italic">
                    Temps total
                  </Text>
                </Stack>
              ) : (
                <Stack gap="0rem">
                  <Text fw={500}>{activityData.duration}</Text>
                  <Text size="xs" fs="italic">
                    Temps total
                  </Text>
                </Stack>
              )}

              {activityData.distance === null ? (
                <Stack gap="0rem">
                  <Text fw={500}>--</Text>
                  <Text size="xs" fs="italic">
                    Distance
                  </Text>
                </Stack>
              ) : (
                <Stack gap="0rem">
                  <Text fw={500}>{activityData.distance} km</Text>
                  <Text size="xs" fs="italic">
                    Distance
                  </Text>
                </Stack>
              )}

              {/* Conditionnal render of pace and speed */}
              {!emptyPaceAndSpeed &&
              activityData.duration !== null &&
              activityData.distance !== null ? (
                <>
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
                </>
              ) : (
                []
              )}

              <Divider my="0.3rem" />

              <Stack gap="0rem">
                {activityData.date_scheduled && (
                  <>
                    <Text fw={500}>
                      {/* Function to transform date into DAY-MONTH-YEAR format */}
                      {convertDateFormat(activityData.date_scheduled)}
                    </Text>
                    <Text size="xs" fs="italic">
                      Date prévue
                    </Text>
                  </>
                )}
              </Stack>

              <Stack gap="0rem">
                {activityData.date_accomplished ? (
                  <Text fw={500}>
                    {/* Function to transform date into DAY-MONTH-YEAR format */}
                    {convertDateFormat(activityData.date_accomplished)}
                  </Text>
                ) : (
                  <Text fw={500}>À réaliser</Text>
                )}
                <Text size="xs" fs="italic">
                  Date réalisation
                </Text>
              </Stack>

              {activityData.hecho ? (
                <Button color="button.0">HECHO</Button>
              ) : (
                // Component to update accomplished date and tag the activity as HECHO
                <HechoBtn />
              )}
            </Stack>
          )}

          {/* Aside section responsive render if mobile */}
          {isMobile && (
            <Stack className="activity__aside" align="center" gap={'sm'}>
              <Group>
                <Stack gap="0rem" align="center">
                  <Text fw={500} tt="uppercase">
                    {activityData.sport.name}
                  </Text>
                  <Text size="xs" fs="italic">
                    Type
                  </Text>
                </Stack>
              </Group>

              <Group w={'80%'} justify="space-between">
                {activityData.duration == '' ||
                activityData.duration === '00:00:00' ? (
                  <Stack gap="0rem" align="flex-start">
                    <Text fw={500}>--</Text>
                    <Text size="xs" fs="italic">
                      Temps total
                    </Text>
                  </Stack>
                ) : (
                  <Stack gap="0rem" align="flex-start">
                    <Text fw={500}>{activityData.duration}</Text>
                    <Text size="xs" fs="italic">
                      Temps total
                    </Text>
                  </Stack>
                )}

                {activityData.distance === null ? (
                  <Stack gap="0rem" align="flex-end">
                    <Text fw={500}>--</Text>
                    <Text size="xs" fs="italic">
                      Distance
                    </Text>
                  </Stack>
                ) : (
                  <Stack gap="0rem" align="flex-end">
                    <Text fw={500}>{activityData.distance} km</Text>
                    <Text size="xs" fs="italic">
                      Distance
                    </Text>
                  </Stack>
                )}
              </Group>

              <Group w={'80%'} justify="space-between">
                {/* Conditionnal render of pace and speed */}
                {!emptyPaceAndSpeed ? (
                  <>
                    <Stack gap="0rem" align="flex-start">
                      {speed === 'NaN' ? (
                        <Text fw={500}>--</Text>
                      ) : (
                        <Text fw={500}>{speed} km/h</Text>
                      )}
                      <Text size="xs" fs="italic">
                        Vitesse moyenne
                      </Text>
                    </Stack>

                    <Stack gap="0rem" align="flex-end">
                      {pace === 'NaN' ? (
                        <Text fw={500}>--</Text>
                      ) : (
                        <Text fw={500}>{pace} min/km</Text>
                      )}
                      <Text size="xs" fs="italic">
                        Allure
                      </Text>
                    </Stack>
                  </>
                ) : (
                  []
                )}
              </Group>

              <Group w={'80%'} justify="space-between">
                <Stack gap="0rem" align="flex-start">
                  {activityData.date_scheduled && (
                    <>
                      <Text fw={500}>
                        {/* Function to transform date into DAY-MONTH-YEAR format */}
                        {convertDateFormat(activityData.date_scheduled)}
                      </Text>
                      <Text size="xs" fs="italic">
                        Date prévue
                      </Text>
                    </>
                  )}
                </Stack>

                <Stack gap="0rem" align="flex-end">
                  {activityData.date_accomplished ? (
                    <Text fw={500}>
                      {/* Function to transform date into DAY-MONTH-YEAR format */}
                      {convertDateFormat(activityData.date_accomplished)}
                    </Text>
                  ) : (
                    <Text fw={500}>À réaliser</Text>
                  )}
                  <Text size="xs" fs="italic">
                    Date réalisation
                  </Text>
                </Stack>
              </Group>

              <Group>
                {activityData.hecho ? (
                  <Button color="button.0">HECHO</Button>
                ) : (
                  // Component to update accomplished date and tag the activity as HECHO
                  <HechoBtn />
                )}
              </Group>
            </Stack>
          )}
        </Flex>
      </Container>
    </Container>
  );
}

export default Activity;
