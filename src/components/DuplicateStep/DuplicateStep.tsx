import { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Tooltip, UnstyledButton } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';

import { useAppDispatch } from '../../hooks/redux';
import { createStep } from '../../store/reducers/createStep';
import { addStep } from '../../store/reducers/addStep';
import { updateActivity } from '../../store/reducers/updateActivity';

type StepProps = {
  stepName: string | undefined;
  stepDistance: string;
  stepDuration: string;
  activityDuration: string;
  activityDistance: string;
};

function DuplicateStep(props: StepProps) {
  const {
    stepName,
    stepDistance,
    stepDuration,
    activityDuration,
    activityDistance,
  } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Retrieve ID of the activity
  const { id } = useParams();
  if (!id) throw new Error('Invalid id');

  const handleDuplicateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Creation of the step with useState datas
    const createdStep = await dispatch(
      createStep({
        name: stepName,
        distance: stepDistance,
        duration: stepDuration,
        user_id: 1,
      })
    ).unwrap();

    // Retrieve new step ID and redirection to the activity's page
    const stepId = createdStep.id;

    // Add the new step to the workout
    await dispatch(
      addStep({
        step_id: stepId,
        workoutId: id,
      })
    );

    // Update activity details with new distance and duration
    await dispatch(
      updateActivity({
        id,
        duration: parseInt(activityDuration) + parseInt(stepDuration),
        distance: parseInt(activityDistance) + parseInt(stepDistance),
        name: '',
        sport_id: null,
        pace: 0,
        user_id: 0,
        hecho: false,
        sport: {
          id: 0,
          name: undefined,
        },
        steps: [],
        tags: [],
      })
    ).then(() => navigate(0));
  };

  return (
    <>
      <Tooltip
        label="Dupliquer l'étape"
        position="top"
        offset={8}
        openDelay={300}
        closeDelay={150}
        transitionProps={{ transition: 'slide-up', duration: 200 }}
        withArrow
      >
        <form onClick={handleDuplicateSubmit}>
          <UnstyledButton>
            <IconCopy size="1.2rem" />
          </UnstyledButton>
        </form>
      </Tooltip>
    </>
  );
}

export default DuplicateStep;
