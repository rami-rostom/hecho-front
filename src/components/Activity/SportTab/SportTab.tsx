import { SetStateAction, useEffect } from 'react';

import { Button, Tooltip } from '@mantine/core';
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
  clickedSport: (activities: Activity[]) => void;
};

function SportTab({ clickedSport }: ActivitiesProps) {
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

  // Update activities data according to the sport filter
  const handleAllActivities = () => {
    clickedSport(activitiesData);
  };

  const handleRunningActivities = () => {
    const running = activitiesData.filter(
      (activity) => activity.sport_id == '1'
    );
    clickedSport(running);
  };

  const handleTrailActivities = () => {
    const trail = activitiesData.filter((activity) => activity.sport_id == '2');
    clickedSport(trail);
  };

  const handleBikeActivities = () => {
    const bike = activitiesData.filter((activity) => activity.sport_id == '3');
    clickedSport(bike);
  };

  const handleSwimActivities = () => {
    const swim = activitiesData.filter((activity) => activity.sport_id == '4');
    clickedSport(swim);
  };

  const handleHikingActivities = () => {
    const hiking = activitiesData.filter(
      (activity) => activity.sport_id == '5'
    );
    clickedSport(hiking);
  };

  return (
    <>
      <Button.Group>
        <Button
          color="button.5"
          variant="outline"
          size="compact-sm"
          radius={'md'}
          px={'lg'}
          onClick={handleAllActivities}
        >
          Tout
        </Button>

        <Button
          color="button.5"
          variant="outline"
          size="compact-sm"
          radius={'md'}
          px={'lg'}
          onClick={handleRunningActivities}
        >
          <Tooltip
            label="Running"
            position="top"
            offset={5}
            openDelay={300}
            closeDelay={150}
            transitionProps={{ transition: 'slide-down', duration: 200 }}
            withArrow
          >
            <IconRun size={'1.3rem'} />
          </Tooltip>
        </Button>

        <Button
          color="button.5"
          variant="outline"
          size="compact-sm"
          radius={'md'}
          px={'lg'}
          onClick={handleTrailActivities}
        >
          <Tooltip
            label="Trail"
            position="top"
            offset={5}
            openDelay={300}
            closeDelay={150}
            transitionProps={{ transition: 'slide-down', duration: 200 }}
            withArrow
          >
            <IconMountain size={'1.3rem'} />
          </Tooltip>
        </Button>

        <Button
          color="button.5"
          variant="outline"
          size="compact-sm"
          radius={'md'}
          px={'lg'}
          onClick={handleBikeActivities}
        >
          <Tooltip
            label="Vélo"
            position="top"
            offset={5}
            openDelay={300}
            closeDelay={150}
            transitionProps={{ transition: 'slide-down', duration: 200 }}
            withArrow
          >
            <IconBike size={'1.3rem'} />
          </Tooltip>
        </Button>

        <Button
          color="button.5"
          variant="outline"
          size="compact-sm"
          radius={'md'}
          px={'lg'}
          onClick={handleSwimActivities}
        >
          <Tooltip
            label="Natation"
            position="top"
            offset={5}
            openDelay={300}
            closeDelay={150}
            transitionProps={{ transition: 'slide-down', duration: 200 }}
            withArrow
          >
            <IconSwimming size={'1.3rem'} />
          </Tooltip>
        </Button>

        <Button
          color="button.5"
          variant="outline"
          size="compact-sm"
          radius={'md'}
          px={'lg'}
          onClick={handleHikingActivities}
        >
          <Tooltip
            label="Randonnée"
            position="top"
            offset={5}
            openDelay={300}
            closeDelay={150}
            transitionProps={{ transition: 'slide-down', duration: 200 }}
            withArrow
          >
            <IconTrekking size={'1.3rem'} />
          </Tooltip>
        </Button>
      </Button.Group>
    </>
  );
}

export default SportTab;
