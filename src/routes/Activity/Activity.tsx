import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchActivity } from '../../store/reducers/activity';

function Activity() {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  if (!id) throw new Error('Invalid id');

  const activityData = useAppSelector((state) => state.activity.activity);

  useEffect(() => {
    dispatch(fetchActivity(id));
  }, [dispatch, id]);

  return (
    <>
      <div>{activityData.name}</div>
      <div>{activityData.date_scheduled}</div>
    </>
  );
}

export default Activity;
