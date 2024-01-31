import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Group, Stack, Text, Title } from '@mantine/core';
import { IconRun } from '@tabler/icons-react';

import {
  convertDateFormat,
  convertDurationToMin,
  paceCalcul,
} from '../../utils/calculation';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserActivities } from '../../store/reducers/getUserActivities';
import SportTab from '../../components/Activity/SportTab/SportTab';

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
      <Title order={1}>Activitiés</Title>

      {/* Component to filter activities by sport */}
      <SportTab />

      {activitiesData
        ? activitiesData.map((activity) => (
            <Stack key={activity.id}>
              <Group gap={'xl'} justify="space-between">
                <IconRun size={'1.3rem'} />

                <Stack gap={'0rem'}>
                  <Text>{convertDateFormat(activity.date_scheduled)}</Text>
                  <Text size="xs" tt={'uppercase'}>
                    Date prévue
                  </Text>
                </Stack>

                <Stack gap={'0rem'}>
                  <Text>{activity.name}</Text>
                  <Text size="xs" tt={'uppercase'}>
                    {activity.sport.name}
                  </Text>
                </Stack>

                <Stack gap={'0rem'}>
                  <Text>{activity.distance} km</Text>
                  <Text size="xs" tt={'uppercase'}>
                    Distance
                  </Text>
                </Stack>

                <Stack gap={'0rem'}>
                  <Text>{activity.duration}</Text>
                  <Text size="xs" tt={'uppercase'}>
                    Durée
                  </Text>
                </Stack>

                {activity.distance && activity.duration ? (
                  <Stack gap={'0rem'}>
                    <Text>
                      {paceCalcul(
                        convertDurationToMin(activity.duration),
                        activity.distance
                      )}{' '}
                      min/km
                    </Text>
                    <Text size="xs" tt={'uppercase'}>
                      Allure moyenne
                    </Text>
                  </Stack>
                ) : (
                  []
                )}
              </Group>
            </Stack>
          ))
        : []}
    </>
  );
}

export default Activities;
