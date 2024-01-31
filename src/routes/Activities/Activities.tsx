import { SetStateAction, useEffect, useState } from 'react';

import { Button, Group, Stack, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserActivities } from '../../store/reducers/getUserActivities';
import { Activity } from '../../@types/activity';
import SportTab from '../../components/Activity/SportTab/SportTab';
import HechoTab from '../../components/Hecho/HechoTab/HechoTab';
import UserActivities from '../../components/Activity/UserActivities/UserActivities';

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
    setClickActivities(activitiesData);
  }, [activitiesData]);

  // Fetch and render all user activities
  useEffect(() => {
    dispatch(fetchUserActivities(id));
  }, [dispatch, id]);

  const [clickActivities, setClickActivities] = useState(activitiesData);

  // Update clickActivities state according to the sport filter
  const clickedSport = (clickActivities: SetStateAction<Activity[]>) => {
    setClickActivities(clickActivities);
  };

  return (
    <>
      <Stack gap={'xl'} px={'5rem'} py={'xl'}>
        <Title order={1}>Activités</Title>
        <Group justify="space-between">
          {/* Component to filter activities if they are done or not */}
          <HechoTab />

          {/* Component to filter activities by sport */}
          <SportTab clickedSport={clickedSport} />
        </Group>
        {/* Component to render activities of the user */}

        <UserActivities activities={clickActivities} />

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
