import { useEffect, useState } from 'react';

import { Center, SegmentedControl, rem } from '@mantine/core';
import {
  IconBike,
  IconMountain,
  IconRun,
  IconSwimming,
  IconTrekking,
} from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchUserActivities } from '../../../store/reducers/getUserActivities';
import { Activity } from '../../../@types/activity';

type ActivitiesProps = {
  activitiesSport: (activities: Activity[]) => void;
};

function SportTab({ activitiesSport }: ActivitiesProps) {
  const dispatch = useAppDispatch();

  // Retrieve user ID from state
  const id = useAppSelector((state) => state.login.data.userId);

  // Fetch and render all user activities
  useEffect(() => {
    dispatch(fetchUserActivities(id));
  }, [dispatch, id]);

  // Retrieve user activities from state
  const activitiesData = useAppSelector(
    (state) => state.getUserActivities.activity
  );

  const [sportValue, setSportValue] = useState('all');

  // Update activities datas when sport value change
  useEffect(() => {
    if (sportValue === 'all') {
      activitiesSport(activitiesData);
    }

    if (sportValue === 'running') {
      const running = activitiesData.filter(
        (activity) => activity.sport_id == '1'
      );
      activitiesSport(running);
    }

    if (sportValue === 'trail') {
      const trail = activitiesData.filter(
        (activity) => activity.sport_id == '2'
      );
      activitiesSport(trail);
    }

    if (sportValue === 'bike') {
      const bike = activitiesData.filter(
        (activity) => activity.sport_id == '3'
      );
      activitiesSport(bike);
    }

    if (sportValue === 'swim') {
      const swim = activitiesData.filter(
        (activity) => activity.sport_id == '4'
      );
      activitiesSport(swim);
    }

    if (sportValue === 'hiking') {
      const hiking = activitiesData.filter(
        (activity) => activity.sport_id == '5'
      );
      activitiesSport(hiking);
    }
  }, [sportValue]);

  return (
    <>
      <SegmentedControl
        color="button.5"
        size="xs"
        w={'70%'}
        radius="md"
        value={sportValue}
        onChange={setSportValue}
        data={[
          { label: 'Tout', value: 'all' },
          {
            label: (
              <Center style={{ gap: 10 }}>
                <IconRun style={{ width: rem(16), height: rem(16) }} />
                <span>Running</span>
              </Center>
            ),
            value: 'running',
          },
          {
            label: (
              <Center style={{ gap: 10 }}>
                <IconMountain style={{ width: rem(16), height: rem(16) }} />
                <span>Trail</span>
              </Center>
            ),
            value: 'trail',
          },
          {
            label: (
              <Center style={{ gap: 10 }}>
                <IconBike style={{ width: rem(16), height: rem(16) }} />
                <span>Vélo</span>
              </Center>
            ),
            value: 'bike',
          },
          {
            label: (
              <Center style={{ gap: 10 }}>
                <IconSwimming style={{ width: rem(16), height: rem(16) }} />
                <span>Natation</span>
              </Center>
            ),
            value: 'swim',
          },
          {
            label: (
              <Center style={{ gap: 10 }}>
                <IconTrekking style={{ width: rem(16), height: rem(16) }} />
                <span>Randonnée</span>
              </Center>
            ),
            value: 'hiking',
          },
        ]}
      />
    </>
  );
}

export default SportTab;
