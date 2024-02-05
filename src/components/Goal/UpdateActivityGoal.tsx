import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Group,
  NumberInput,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCircleCheck, IconCircleX, IconPencil } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateGoal } from '../../store/reducers/updateGoal';
import { fetchGoal } from '../../store/reducers/getGoal';
import { createGoal } from '../../store/reducers/createGoal';

type GoalProps = {
  userId: number;
};

function UpdateActivityGoal(props: GoalProps) {
  const { userId } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Fetch user goal
  useEffect(() => {
    dispatch(fetchGoal(userId));
  }, [dispatch, userId]);

  const goalData = useAppSelector((state) => state.getGoal.goal);

  const goalActivity = goalData && goalData[0] ? goalData[0].activity : 0;

  const [openActivityHandler, activityHandler] = useDisclosure(false);
  const [activityValue, setActivityValue] = useState<number>(0);

  const handleActivityChange = (value: string | number) => {
    setActivityValue(value as number);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (goalData.length === 0) {
      const createdGoal = await dispatch(
        createGoal({
          activity: '0',
          distance: '0',
          duration: '00:00:00',
          user_id: userId,
        })
      ).unwrap();

      const goalId = createdGoal.id;

      await dispatch(
        updateGoal({
          id: goalId,
          activity: activityValue,
          distance: 0,
          duration: '',
          user_id: 0,
        })
      ).then(() => navigate(0));
    } else {
      await dispatch(
        updateGoal({
          id: goalData[0].id,
          activity: activityValue,
          distance: 0,
          duration: '',
          user_id: 0,
        })
      ).then(() => navigate(0));
    }
  };

  return (
    <>
      <Group>
        {!openActivityHandler ? (
          <>
            <Text c={'palette.0'} fw={700}>
              {goalActivity}
            </Text>
            <UnstyledButton onClick={() => activityHandler.open()}>
              <Tooltip
                label="Modifier"
                position="right"
                offset={5}
                openDelay={300}
                closeDelay={150}
                transitionProps={{
                  transition: 'slide-left',
                  duration: 200,
                }}
                withArrow
              >
                <IconPencil size="0.8rem" />
              </Tooltip>
            </UnstyledButton>
          </>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <Group gap={'sm'}>
              <Group gap={'0.1rem'}>
                <NumberInput
                  py={'xs'}
                  w={'5rem'}
                  size="xs"
                  defaultValue={goalActivity}
                  onChange={handleActivityChange}
                />
                <UnstyledButton type="submit">
                  <IconCircleCheck color="var(--mantine-color-button-0)" />
                </UnstyledButton>

                <UnstyledButton onClick={() => activityHandler.close()}>
                  <IconCircleX color="var(--mantine-color-button-4)" />
                </UnstyledButton>
              </Group>
            </Group>
          </form>
        )}
      </Group>
    </>
  );
}

export default UpdateActivityGoal;
