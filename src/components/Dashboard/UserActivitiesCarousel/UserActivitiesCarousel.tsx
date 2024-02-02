import { Flex, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import {
  IconBike,
  IconMountain,
  IconRun,
  IconSwimming,
  IconTrekking,
} from '@tabler/icons-react';

import { Activity } from '../../../@types/activity';
import {
  convertDateFormat,
  convertDurationToMin,
  paceCalcul,
} from '../../../utils/calculation';

import './UserActivitiesCarousel.scss';
import { Carousel } from '@mantine/carousel';

type ActivitiesProps = {
  activities: Activity[];
};

function UserActivitiesCarousel(props: ActivitiesProps) {
  const { activities } = props;

  return (
    <>
      <Stack gap={'lg'}>
        <Carousel height={215} controlSize={15} withIndicators loop>
          {activities &&
            activities.map((activity) => (
              <Carousel.Slide key={activity.id}>
                <Flex
                  direction={'column'}
                  align={'center'}
                  justify={'space-between'}
                  wrap={'wrap'}
                  gap={'1rem'}
                  px={'sm'}
                  py={'sm'}
                  className="activity-item"
                >
                  {/* Icon section */}
                  <Group>
                    <Stack>
                      {activity.sport_id == '1' && (
                        <IconRun
                          color="var(--mantine-color-button-5)"
                          size={'1.3rem'}
                        />
                      )}

                      {activity.sport_id == '2' && (
                        <IconMountain
                          color="var(--mantine-color-button-5)"
                          size={'1.3rem'}
                        />
                      )}

                      {activity.sport_id == '3' && (
                        <IconBike
                          color="var(--mantine-color-button-5)"
                          size={'1.3rem'}
                        />
                      )}

                      {activity.sport_id == '4' && (
                        <IconSwimming
                          color="var(--mantine-color-button-5)"
                          size={'1.3rem'}
                        />
                      )}

                      {activity.sport_id == '5' && (
                        <IconTrekking
                          color="var(--mantine-color-button-5)"
                          size={'1.3rem'}
                        />
                      )}
                    </Stack>
                  </Group>

                  {/* Name section */}
                  <Stack gap={'0rem'} align="center">
                    <UnstyledButton
                      component="a"
                      href={`/activity/${activity.id}`}
                      className="activity-link"
                    >
                      {activity.name}
                    </UnstyledButton>
                    <Text size="0.6rem" tt={'uppercase'}>
                      {activity.sport.name}
                    </Text>
                  </Stack>

                  {/* Date, distance, duration and pace section */}
                  <Group justify="center">
                    {/* Conditionnal render for date */}
                    {activity.date_accomplished === null ? (
                      <Stack gap={'0rem'} align="center">
                        <Text>--</Text>
                        <Text size="0.6rem" tt={'uppercase'}>
                          Date Hecho
                        </Text>
                      </Stack>
                    ) : (
                      <Stack gap={'0rem'} align="center">
                        <Text>
                          {convertDateFormat(activity.date_accomplished)}
                        </Text>
                        <Text size="0.6rem" tt={'uppercase'}>
                          Date Hecho
                        </Text>
                      </Stack>
                    )}

                    {/* Conditionnal render for distance */}
                    {activity.distance === null ? (
                      <Stack gap={'0rem'} w={'3rem'} align="center">
                        <Text>--</Text>
                        <Text size="0.6rem" tt={'uppercase'}>
                          Distance
                        </Text>
                      </Stack>
                    ) : (
                      <Stack gap={'0rem'} w={'3rem'} align="center">
                        <Text>{activity.distance} km</Text>
                        <Text size="0.6rem" tt={'uppercase'}>
                          Distance
                        </Text>
                      </Stack>
                    )}

                    {/* Conditionnal render for duration */}
                    {activity.duration === '00:00:00' ? (
                      <Stack gap={'0rem'} w={'4rem'} align="center">
                        <Text>--</Text>
                        <Text size="0.6rem" tt={'uppercase'}>
                          Durée
                        </Text>
                      </Stack>
                    ) : (
                      <Stack gap={'0rem'} w={'4rem'} align="center">
                        <Text>{activity.duration}</Text>
                        <Text size="0.6rem" tt={'uppercase'}>
                          Durée
                        </Text>
                      </Stack>
                    )}
                  </Group>

                  {/* Conditionnal render for pace */}
                  <Group justify="center">
                    {activity.distance === null ||
                    activity.duration === '00:00:00' ? (
                      <Stack gap={'0rem'} align="center">
                        <Text>--</Text>
                        <Text size="0.6rem" tt={'uppercase'}>
                          Allure moyenne
                        </Text>
                      </Stack>
                    ) : (
                      <Stack gap={'0rem'} align="center">
                        <Text>
                          {paceCalcul(
                            convertDurationToMin(activity.duration),
                            activity.distance
                          )}{' '}
                          min/km
                        </Text>
                        <Text size="0.6rem" tt={'uppercase'}>
                          Allure moyenne
                        </Text>
                      </Stack>
                    )}
                  </Group>
                </Flex>
              </Carousel.Slide>
            ))}
        </Carousel>
      </Stack>
    </>
  );
}

export default UserActivitiesCarousel;
