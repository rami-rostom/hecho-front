import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserActivities } from '../../store/reducers/getUserActivities';
import { Button, Title, Tooltip } from '@mantine/core';
import { IconRun } from '@tabler/icons-react';
import SportTab from '../../components/Activity/SportTab/SportTab';

function Activities() {
  const dispatch = useAppDispatch();

  // Retrieve user ID
  const { id } = useParams();
  if (!id) throw new Error('Invalid id');

  // Render all user activities
  useEffect(() => {
    dispatch(fetchUserActivities(id));
  }, [dispatch, id]);

  const activitiesData = useAppSelector(
    (state) => state.getUserActivities.activity
  );
  const { steps, tags } = activitiesData;

  console.log(activitiesData);

  return (
    <>
      <Title order={1}>Activitiés</Title>

      {/* Component to filter activities by sport */}
      <SportTab />
    </>
  );
}

export default Activities;
