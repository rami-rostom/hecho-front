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

type GoalProps = {
  userId: number;
};

function UpdateDistanceGoal(props: GoalProps) {
  const { userId } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Fetch user goal
  useEffect(() => {
    dispatch(fetchGoal(userId));
  }, [dispatch, userId]);

  const goalData = useAppSelector((state) => state.getGoal.goal);

  const goalDistance = goalData && goalData[0] ? goalData[0].distance : 0;

  const [openDistanceHandler, distanceHandler] = useDisclosure(false);
  const [distanceValue, setDistanceValue] = useState<number>(0);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      updateGoal({
        id: goalData[0].id,
        activity: 0,
        distance: distanceValue,
        duration: '',
        user_id: 0,
      })
    ).then(() => navigate(0));
  };

  return (
    <>
      <Group>
        {!openDistanceHandler ? (
          <>
            <Text c={'palette.0'} fw={700}>
              {goalDistance} km
            </Text>
            <UnstyledButton onClick={() => distanceHandler.open()}>
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
                  defaultValue={goalDistance}
                  onChange={setDistanceValue}
                />
                <UnstyledButton type="submit">
                  <IconCircleCheck color="var(--mantine-color-button-0)" />
                </UnstyledButton>

                <UnstyledButton onClick={() => distanceHandler.close()}>
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

export default UpdateDistanceGoal;
