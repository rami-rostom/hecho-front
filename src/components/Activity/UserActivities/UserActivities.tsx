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

import './UserActivities.scss';

type ActivitiesProps = {
  activities: Activity[];
};

function UserActivities(props: ActivitiesProps) {
  const { activities } = props;

  return (
    <>
      <Stack gap={'lg'}>
        {activities &&
          activities.map((activity) => (
            <Flex
              key={activity.id}
              align={'center'}
              justify={'space-between'}
              wrap={'wrap'}
              gap={'1rem'}
              px={'xl'}
              py={'0.3rem'}
              className="activity-item"
            >
              {/* Icon and date section */}
              <Group gap={'xl'}>
                <Stack w={'1.5rem'}>
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

                <Stack gap={'0rem'} w={'6rem'}>
                  <Text>{convertDateFormat(activity.date_scheduled)}</Text>
                  <Text size="0.6rem" tt={'uppercase'}>
                    Date prévue
                  </Text>
                </Stack>
              </Group>

              {/* Name, distance, duration and pace section */}
              <Stack gap={'0rem'} w={'40%'}>
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

              {/* Conditionnal render for distance */}
              {activity.distance === null ? (
                <Stack gap={'0rem'} w={'3rem'}>
                  <Text>--</Text>
                  <Text size="0.6rem" tt={'uppercase'}>
                    Distance
                  </Text>
                </Stack>
              ) : (
                <Stack gap={'0rem'} w={'3rem'}>
                  <Text>{activity.distance} km</Text>
                  <Text size="0.6rem" tt={'uppercase'}>
                    Distance
                  </Text>
                </Stack>
              )}

              {/* Conditionnal render for duration */}
              {activity.duration === '00:00:00' ? (
                <Stack gap={'0rem'} w={'4rem'}>
                  <Text>--</Text>
                  <Text size="0.6rem" tt={'uppercase'}>
                    Durée
                  </Text>
                </Stack>
              ) : (
                <Stack gap={'0rem'} w={'4rem'}>
                  <Text>{activity.duration}</Text>
                  <Text size="0.6rem" tt={'uppercase'}>
                    Durée
                  </Text>
                </Stack>
              )}

              {/* Conditionnal render for pace */}
              {activity.distance === null ||
              activity.duration === '00:00:00' ? (
                <Stack gap={'0rem'}>
                  <Text>--</Text>
                  <Text size="0.6rem" tt={'uppercase'}>
                    Allure moyenne
                  </Text>
                </Stack>
              ) : (
                <Stack gap={'0rem'}>
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
            </Flex>
          ))}

        {activities.length === 0 && (
          <Group justify="center" py={'xs'} className="activity-item">
            <Text>Aucune activité réalisée pour ce sport.</Text>
          </Group>
        )}
      </Stack>
    </>
  );
}

export default UserActivities;
