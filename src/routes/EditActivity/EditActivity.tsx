import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Button,
  Container,
  Divider,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  em,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import ActivityIcon from '../../components/Activity/ActivityIcon/ActivityIcon';
import Hecho from '../../components/Hecho/HechoBtn/HechoBtn';
import RemoveStep from '../../components/Step/RemoveStep/RemoveStep';
import DeleteActivity from '../../components/Activity/DeleteActivity/DeleteActivity';
import UpdateStep from '../../components/Step/UpdateStep/UpdateStep';
import UpdateActivityName from '../../components/Activity/UpdateActivityName/UpdateActivityName';
import UpdateActivityDate from '../../components/Activity/UpdateActivityDate/UpdateActivityDate';
import AddTag from '../../components/Tag/AddTag/AddTag';
import UpdateTag from '../../components/Tag/UpdateTag/UpdateTag';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchActivity } from '../../store/reducers/getActivity';
import {
  convertDateFormat,
  convertDurationToMin,
  paceCalcul,
  speedCalcul,
} from '../../utils/calculation';

import './EditActivity.scss';

function EditActivity() {
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
  const pace = paceCalcul(
    Number(convertDurationToMin(activityData.duration)),
    activityData.distance
  );

  // Function who render true or false if one of the step has an empty duration or distance value
  const emptyPaceAndSpeed = activityData.steps.find(
    (step) => step.duration === '' || step.distance === null
  );

  // Boolean for responsive design
  const isMobile = useMediaQuery(`(max-width: ${em(600)})`);

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

            {/* Component to render activity name and to update it */}
            <UpdateActivityName
              activityId={activityData.id}
              activityName={activityData.name}
            />

            {tags
              ? tags.map((tag) => (
                  // Component to render tag of the activity and to update it
                  <UpdateTag key={tag.id} tagId={tag.id} tagName={tag.name} />
                ))
              : []}
          </Group>
          <Group gap="xs">
            <Button
              size="compact-xs"
              color="button.4"
              variant="outline"
              component="a"
              href={`/activity/${id}`}
            >
              Retour
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
                      <Group gap="0.4rem">
                        {/* Component opening a modal to update the step */}
                        <UpdateStep
                          stepId={step.id}
                          stepName={step.name}
                          stepDistance={step.distance}
                          stepDuration={step.duration.toString()}
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
                                Number(convertDurationToMin(step.duration)),
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

            <Group justify="flex-end">
              <AddTag />
            </Group>
          </Stack>

          {!isMobile && (
            <Stack className="activity__aside">
              <Stack gap="0rem">
                <Text fw={500} tt="uppercase">
                  {activityData.sport.name}
                </Text>
                <Text size="xs" fs="italic">
                  Type
                </Text>
              </Stack>

              {activityData.duration == '' ||
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
              {!emptyPaceAndSpeed ? (
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
                <Group gap="xs">
                  {activityData.date_scheduled && (
                    <Text fw={500}>
                      {/* Function to transform date into DAY-MONTH-YEAR format */}
                      {convertDateFormat(activityData.date_scheduled)}
                    </Text>
                  )}
                  <UpdateActivityDate
                    activityId={activityData.id}
                    scheduledDate={true}
                  />
                </Group>
                <Text size="xs" fs="italic">
                  Date prévue
                </Text>
              </Stack>

              <Stack gap="0rem">
                {activityData.date_accomplished ? (
                  <Group gap="xs">
                    <Text fw={500}>
                      {/* Function to transform date into DAY-MONTH-YEAR format */}
                      {convertDateFormat(activityData.date_accomplished)}
                    </Text>
                    <UpdateActivityDate
                      activityId={activityData.id}
                      scheduledDate={false}
                    />
                  </Group>
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
                <Hecho />
              )}
            </Stack>
          )}

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

              <Group w={'85%'} justify="space-between">
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

              <Group w={'85%'} justify="space-between">
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

              <Group w={'85%'} justify="space-between">
                <Stack gap="0rem" align="flex-start">
                  <Group gap="xs">
                    {activityData.date_scheduled && (
                      <Text fw={500}>
                        {/* Function to transform date into DAY-MONTH-YEAR format */}
                        {convertDateFormat(activityData.date_scheduled)}
                      </Text>
                    )}
                    <UpdateActivityDate
                      activityId={activityData.id}
                      scheduledDate={true}
                    />
                  </Group>
                  <Text size="xs" fs="italic">
                    Date prévue
                  </Text>
                </Stack>

                <Stack gap="0rem" align="flex-end">
                  {activityData.date_accomplished ? (
                    <Group gap="xs">
                      <Text fw={500}>
                        {/* Function to transform date into DAY-MONTH-YEAR format */}
                        {convertDateFormat(activityData.date_accomplished)}
                      </Text>
                      <UpdateActivityDate
                        activityId={activityData.id}
                        scheduledDate={false}
                      />
                    </Group>
                  ) : (
                    <Text fw={500}>À réaliser</Text>
                  )}
                  <Text size="xs" fs="italic">
                    Date réalisation
                  </Text>
                </Stack>
              </Group>

              {activityData.hecho ? (
                <Button color="button.0">HECHO</Button>
              ) : (
                // Component to update accomplished date and tag the activity as HECHO
                <Hecho />
              )}
            </Stack>
          )}
        </Flex>
      </Container>
    </Container>
  );
}

export default EditActivity;
