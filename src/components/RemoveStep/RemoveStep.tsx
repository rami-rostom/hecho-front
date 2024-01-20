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
import { useAppDispatch } from '../../hooks/redux';
import { removeStep } from '../../store/reducers/removeStep';

type StepProps = {
  stepId: string | undefined;
};

function RemoveStep(props: StepProps) {
  const { stepId } = props;

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
    ).then(() => navigate(0));
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Supprimer l'étape de l'activité"
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
          <IconTrash size="1rem" color="var(--mantine-color-button-2)" />
        </UnstyledButton>
      </Tooltip>
    </>
  );
}

export default RemoveStep;
