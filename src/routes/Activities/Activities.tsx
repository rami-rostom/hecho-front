import { useEffect } from 'react';

import {
  Button,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconPlus, IconRun } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserActivities } from '../../store/reducers/getUserActivities';
import SportTab from '../../components/Activity/SportTab/SportTab';
import HechoTab from '../../components/Hecho/HechoTab/HechoTab';
import {
  convertDateFormat,
  convertDurationToMin,
  paceCalcul,
} from '../../utils/calculation';

import './Activities.scss';

function Activities() {
  const dispatch = useAppDispatch();

  // Retrieve user ID
  const id = useAppSelector((state) => state.login.data.userId);

  // Render all user activities
  useEffect(() => {
    dispatch(fetchUserActivities(id));
  }, [dispatch, id]);

  const activitiesData = useAppSelector(
    (state) => state.getUserActivities.activity
  );

  return (
    <>
      <Stack gap={'xl'} px={'5rem'} py={'xl'}>
        <Title order={1}>Activités</Title>

        <Group justify="space-between">
          {/* Component to filter activities if they are done or not */}
          <HechoTab />
          {/* Component to filter activities by sport */}
          <SportTab />
        </Group>

        <Stack gap={'lg'}>
          {activitiesData
            ? activitiesData.map((activity) => (
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
                  <Group gap={'xl'}>
                    <Stack w={'1.5rem'}>
                      <IconRun
                        color="var(--mantine-color-button-5)"
                        size={'1.3rem'}
                      />
                    </Stack>

                    <Stack gap={'0rem'} w={'6rem'}>
                      <Text>{convertDateFormat(activity.date_scheduled)}</Text>
                      <Text size="0.6rem" tt={'uppercase'}>
                        Date prévue
                      </Text>
                    </Stack>
                  </Group>

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
              ))
            : []}
        </Stack>

        <Group justify="flex-end">
          <Button
            color="button.0"
            size="compact-xs"
            component="a"
            href="/activity/create"
          >
            <IconPlus size="1rem" className="activity__steps-button" />
            Nouvelle activité
          </Button>
        </Group>
      </Stack>
    </>
  );
}

export default Activities;
