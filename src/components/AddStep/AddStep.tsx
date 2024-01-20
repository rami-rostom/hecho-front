import { useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TimeInput } from '@mantine/dates';
import { IconPlus } from '@tabler/icons-react';

import { useAppDispatch } from '../../hooks/redux';
import { createStep } from '../../store/reducers/createStep';
import { addStep } from '../../store/reducers/addStep';

function AddStep() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Retrieve ID of the activity
  const { id } = useParams();
  if (!id) throw new Error('Invalid id');

  const [opened, { close, open }] = useDisclosure(false);
  const [nameValue, setNameValue] = useState('');
  const [durationValue, setDurationValue] = useState<string | undefined>('');
  const [distanceValue, setDistanceValue] = useState<string | number>('');

  // Function to transform duration in minutes
  const convertDurationToMin = (duration?: string) => {
    if (duration) {
      const [heures, minutes, secondes] = duration.split(':').map(Number);
      const durationInMin = heures * 60 + minutes + secondes / 60;

      // Fixe value with two decimals
      return durationInMin.toFixed(2);
    }
    return duration;
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Creation of the step with useState datas
    const createdStep = await dispatch(
      createStep({
        name: nameValue,
        duration: convertDurationToMin(durationValue),
        distance: distanceValue,
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
    ).then(() => navigate(0));
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xs"
        centered
        title="Ajouter une étape"
      >
        <form onSubmit={handleFormSubmit}>
          <Stack gap="xs">
            <TextInput
              withAsterisk
              label="Nom"
              placeholder="Nom de l'étape"
              onChange={(event) => setNameValue(event.target.value)}
            />

            <TimeInput
              withSeconds
              withAsterisk
              label="Durée"
              description="hh-mm-ss"
              onChange={(event) => setDurationValue(event.target.value)}
            />

            <NumberInput
              withAsterisk
              label="Distance"
              description="Décimale possible"
              suffix=" km"
              placeholder="Distance de l'étape"
              min={0}
              value={distanceValue}
              onChange={setDistanceValue}
            />

            <Group justify="flex-end" mt="md">
              <Button color="button.0" type="submit">
                Ajouter
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Button
        color="button.4"
        size="compact-xs"
        variant="outline"
        onClick={open}
      >
        <IconPlus size="1rem" className="activity__steps-button" />
        Ajouter une étape
      </Button>
    </>
  );
}

export default AddStep;