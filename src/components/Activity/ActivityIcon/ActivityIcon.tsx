import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { Tooltip } from '@mantine/core';

import {
  IconBike,
  IconMountain,
  IconRun,
  IconSwimming,
  IconTrekking,
} from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchActivity } from '../../../store/reducers/getActivity';

function ActivityIcon() {
  const dispatch = useAppDispatch();

  // Retrieve ID of the activity
  const { id } = useParams();
  if (!id) throw new Error('Invalid id');

  // Render activity page using ID and fetchActivity function
  useEffect(() => {
    dispatch(fetchActivity(id));
  }, [dispatch, id]);

  const activityData = useAppSelector((state) => state.getActivity.activity);

  return (
    <>
      {activityData.sport.id === 1 && (
        <Tooltip
          label="Running"
          position="left"
          offset={5}
          openDelay={300}
          closeDelay={150}
          transitionProps={{ transition: 'slide-right', duration: 200 }}
          withArrow
        >
          <IconRun size="3rem" className="activity__banner-icon" />
        </Tooltip>
      )}
      {activityData.sport.id === 2 && (
        <Tooltip
          label="Trail"
          position="left"
          offset={5}
          openDelay={300}
          closeDelay={150}
          transitionProps={{ transition: 'slide-right', duration: 200 }}
          withArrow
        >
          <IconMountain size="3rem" className="activity__banner-icon" />
        </Tooltip>
      )}
      {activityData.sport.id === 3 && (
        <Tooltip
          label="Vélo"
          position="left"
          offset={5}
          openDelay={300}
          closeDelay={150}
          transitionProps={{ transition: 'slide-right', duration: 200 }}
          withArrow
        >
          <IconBike size="3rem" className="activity__banner-icon" />
        </Tooltip>
      )}
      {activityData.sport.id === 4 && (
        <Tooltip
          label="Natation"
          position="left"
          offset={5}
          openDelay={300}
          closeDelay={150}
          transitionProps={{ transition: 'slide-right', duration: 200 }}
          withArrow
        >
          <IconSwimming size="3rem" className="activity__banner-icon" />
        </Tooltip>
      )}
      {activityData.sport.id === 5 && (
        <Tooltip
          label="Randonnée"
          position="left"
          offset={5}
          openDelay={300}
          closeDelay={150}
          transitionProps={{ transition: 'slide-right', duration: 200 }}
          withArrow
        >
          <IconTrekking size="3rem" className="activity__banner-icon" />
        </Tooltip>
      )}
    </>
  );
}

export default ActivityIcon;
