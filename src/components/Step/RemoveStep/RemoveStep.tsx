import { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Group,
  Modal,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import { useDisclosure } from '@mantine/hooks';
import { useAppDispatch } from '../../../hooks/redux';
import { removeStep } from '../../../store/reducers/removeStep';
import { updateActivity } from '../../../store/reducers/updateActivity';
import { subDurations } from '../../../utils/calculation';

type StepProps = {
  stepId: string | undefined;
  stepDistance: number;
  stepDuration: string;
  activityDuration: string;
  activityDistance: number;
};

function RemoveStep(props: StepProps) {
  const {
    stepId,
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

  const [opened, { open, close }] = useDisclosure(false);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Remove step from the workout
    await dispatch(
      removeStep({
        step_id: stepId,
        workoutId: id,
      })
    );

    if (stepDistance != 0 && stepDuration != '') {
      // Update render of activity details
      await dispatch(
        updateActivity({
          id,
          duration: subDurations(activityDuration, stepDuration),
          distance: Number(activityDistance) - Number(stepDistance),
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
    }

    if (stepDistance != 0 && stepDuration == '') {
      // Update render of activity details
      await dispatch(
        updateActivity({
          id,
          duration: activityDuration,
          distance: Number(activityDistance) - Number(stepDistance),
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
    }

    if (stepDuration != '' && stepDistance == 0) {
      // Update render of activity details
      await dispatch(
        updateActivity({
          id,
          duration: subDurations(activityDuration, stepDuration),
          distance: Number(activityDistance),
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
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Supprimer l'étape de l'activité"
        centered
      >
        <form onSubmit={handleFormSubmit}>
          <Text>Voulez-vous vraiment supprimer votre étape ?</Text>
          <Group justify="flex-end" pt="lg" gap="xs">
            <Button color="button.0" variant="outline" onClick={close}>
              Annuler
            </Button>
            <Button color="button.2" type="submit">
              Supprimer
            </Button>
          </Group>
        </form>
      </Modal>

      <Tooltip
        label="Supprimer l'étape"
        position="top"
        offset={8}
        openDelay={300}
        closeDelay={150}
        transitionProps={{ transition: 'slide-up', duration: 200 }}
        withArrow
      >
        <UnstyledButton onClick={open}>
          <IconTrash size="1.2rem" color="var(--mantine-color-button-2)" />
        </UnstyledButton>
      </Tooltip>
    </>
  );
}

export default RemoveStep;
