import { useEffect, useState } from 'react';

import { Center, Group, SegmentedControl, Tooltip, rem } from '@mantine/core';
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
        w={'50%'}
        radius="md"
        value={sportValue}
        onChange={setSportValue}
        data={[
          { label: 'Tout', value: 'all' },
          {
            label: (
              <Center>
                <Tooltip
                  label="Running"
                  position="top"
                  offset={5}
                  openDelay={300}
                  closeDelay={150}
                  transitionProps={{ transition: 'slide-down', duration: 200 }}
                  withArrow
                >
                  <IconRun style={{ width: rem(18), height: rem(18) }} />
                </Tooltip>
              </Center>
            ),
            value: 'running',
          },
          {
            label: (
              <Center>
                <Tooltip
                  label="Trail"
                  position="top"
                  offset={5}
                  openDelay={300}
                  closeDelay={150}
                  transitionProps={{ transition: 'slide-down', duration: 200 }}
                  withArrow
                >
                  <IconMountain style={{ width: rem(18), height: rem(18) }} />
                </Tooltip>
              </Center>
            ),
            value: 'trail',
          },
          {
            label: (
              <Center>
                <Tooltip
                  label="Vélo"
                  position="top"
                  offset={5}
                  openDelay={300}
                  closeDelay={150}
                  transitionProps={{ transition: 'slide-down', duration: 200 }}
                  withArrow
                >
                  <IconBike style={{ width: rem(18), height: rem(18) }} />
                </Tooltip>
              </Center>
            ),
            value: 'bike',
          },
          {
            label: (
              <Center>
                <Tooltip
                  label="Natation"
                  position="top"
                  offset={5}
                  openDelay={300}
                  closeDelay={150}
                  transitionProps={{ transition: 'slide-down', duration: 200 }}
                  withArrow
                >
                  <IconSwimming style={{ width: rem(18), height: rem(18) }} />
                </Tooltip>
              </Center>
            ),
            value: 'swim',
          },
          {
            label: (
              <Center>
                <Tooltip
                  label="Randonnée"
                  position="top"
                  offset={5}
                  openDelay={300}
                  closeDelay={150}
                  transitionProps={{ transition: 'slide-down', duration: 200 }}
                  withArrow
                >
                  <IconTrekking style={{ width: rem(18), height: rem(18) }} />
                </Tooltip>
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
