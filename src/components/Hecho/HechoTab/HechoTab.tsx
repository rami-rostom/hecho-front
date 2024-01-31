import { useEffect, useState } from 'react';

import { SegmentedControl } from '@mantine/core';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchUserActivities } from '../../../store/reducers/getUserActivities';
import { Activity } from '../../../@types/activity';

type ActivitiesProps = {
  activitiesHecho: (activities: Activity[]) => void;
};

function HechoTab({ activitiesHecho }: ActivitiesProps) {
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

  const [hechoValue, setHechoValue] = useState('all');

  // Update activities datas when hecho value change
  useEffect(() => {
    if (hechoValue === 'all') {
      activitiesHecho(activitiesData);
    }

    if (hechoValue === 'hecho') {
      const hecho = activitiesData.filter(
        (activity) => activity.hecho === true
      );
      activitiesHecho(hecho);
    }

    if (hechoValue === 'no-hecho') {
      const noHecho = activitiesData.filter(
        (activity) => activity.hecho === false
      );
      activitiesHecho(noHecho);
    }
  }, [hechoValue]);

  return (
    <>
      <SegmentedControl
        color="button.5"
        size="xs"
        w={'20%'}
        radius="md"
        value={hechoValue}
        onChange={setHechoValue}
        data={[
          { label: 'Tout', value: 'all' },
          { label: 'Hecho', value: 'hecho' },
          { label: 'No hecho', value: 'no-hecho' },
        ]}
      />
    </>
  );
}

export default HechoTab;
