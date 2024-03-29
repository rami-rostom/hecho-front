import { SetStateAction, useEffect, useState } from 'react';

import { Group, Stack, Title, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserActivities } from '../../store/reducers/getUserActivities';
import { Activity } from '../../@types/activity';
import SportTab from '../../components/Activity/SportTab/SportTab';
import HechoTab from '../../components/Hecho/HechoTab/HechoTab';
import UserActivities from '../../components/Activity/UserActivities/UserActivities';
import CreateActivity from '../../components/Activity/CreateActivity/CreateActivity';

import './Activities.scss';

function Activities() {
  const dispatch = useAppDispatch();

  // Retrieve user ID from state
  const id = useAppSelector((state) => state.login.data.userId);

  // Retrieve user activities from state
  const activitiesData = useAppSelector(
    (state) => state.getUserActivities.activity
  );

  // Update clickActivities state when activitiesData change
  useEffect(() => {
    setFilterActivities(activitiesData);
  }, [activitiesData]);

  // Fetch and render all user activities
  useEffect(() => {
    dispatch(fetchUserActivities(id));
  }, [dispatch, id]);

  const [filterActivities, setFilterActivities] = useState(activitiesData);

  // Update clickActivities state according to the sport filter
  const filteredActivities = (filterActivities: SetStateAction<Activity[]>) => {
    setFilterActivities(filterActivities);
  };

  // Boolean for responsive design
  const isMobile = useMediaQuery(`(max-width: ${em(600)})`);

  return (
    <>
      <Stack gap={'xl'} px={isMobile ? '2rem' : '5rem'} py={'xl'}>
        <Title order={1} size="1.2rem" tt="uppercase" lts="0.15rem" fw={300}>
          Activités
        </Title>

        <Group justify="space-between">
          {/* Component to filter activities by sport */}
          <SportTab activitiesSport={filteredActivities} />

          {/* Component to filter activities if they are done or not */}
          <HechoTab activitiesHecho={filteredActivities} />
        </Group>

        {/* Component to render activities of the user */}
        <UserActivities activities={filterActivities} />

        <Group justify="flex-end">
          <CreateActivity />
        </Group>
      </Stack>
    </>
  );
}

export default Activities;
