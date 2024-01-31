import { useEffect } from 'react';

import {
  Container,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconRun } from '@tabler/icons-react';

import {
  convertDateFormat,
  convertDurationToMin,
  paceCalcul,
} from '../../utils/calculation';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserActivities } from '../../store/reducers/getUserActivities';
import SportTab from '../../components/Activity/SportTab/SportTab';

import './Activities.scss';
import HechoTab from '../../components/Hecho/HechoTab/HechoTab';

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
      <Container w={'100%'}>
        <Title order={1}>Activitiés</Title>

        <Group justify="space-between">
          {/* Component to filter activities if they are done or not */}
          <HechoTab />
          {/* Component to filter activities by sport */}
          <SportTab />
        </Group>

        <Stack gap={'lg'}>
          {activitiesData
            ? activitiesData.map((activity) => (
                <Group key={activity.id} gap={'2rem'}>
                  <Stack w={'2rem'}>
                    <IconRun size={'1.3rem'} />
                  </Stack>

                  <Stack gap={'0rem'} w={'7rem'}>
                    <Text>{convertDateFormat(activity.date_scheduled)}</Text>
                    <Text size="0.7rem" tt={'uppercase'}>
                      Date prévue
                    </Text>
                  </Stack>

                  <Stack gap={'0rem'} w={'10rem'}>
                    <UnstyledButton
                      component="a"
                      href={`/activity/${activity.id}`}
                      className="activity-link"
                    >
                      {activity.name}
                    </UnstyledButton>
                    <Text size="0.7rem" tt={'uppercase'}>
                      {activity.sport.name}
                    </Text>
                  </Stack>

                  <Stack gap={'0rem'} w={'5rem'}>
                    <Text>{activity.distance} km</Text>
                    <Text size="0.7rem" tt={'uppercase'}>
                      Distance
                    </Text>
                  </Stack>

                  <Stack gap={'0rem'} w={'5rem'}>
                    <Text>{activity.duration}</Text>
                    <Text size="0.7rem" tt={'uppercase'}>
                      Durée
                    </Text>
                  </Stack>

                  {activity.distance && activity.duration ? (
                    <Stack gap={'0rem'} w={'rem'}>
                      <Text>
                        {paceCalcul(
                          convertDurationToMin(activity.duration),
                          activity.distance
                        )}{' '}
                        min/km
                      </Text>
                      <Text size="0.7rem" tt={'uppercase'}>
                        Allure moyenne
                      </Text>
                    </Stack>
                  ) : (
                    []
                  )}
                </Group>
              ))
            : []}
        </Stack>
      </Container>
    </>
  );
}

export default Activities;
