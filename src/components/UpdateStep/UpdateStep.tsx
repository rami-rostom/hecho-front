import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TimeInput } from '@mantine/dates';

import { useAppDispatch } from '../../hooks/redux';
import { updateStep } from '../../store/reducers/updateStep';

import './UpdateStep.scss';

type StepProps = {
  stepId: string;
  stepName: string | undefined;
  stepDistance: string | number | undefined;
};

function UpdateStep(props: StepProps) {
  const { stepId, stepName, stepDistance } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    dispatch(
      updateStep({
        id: stepId,
        name: nameValue,
        duration: convertDurationToMin(durationValue),
        distance: distanceValue,
        user_id: 1,
      })
    )
      .unwrap()
      .then(() => navigate(0));
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xs"
        centered
        title="Modifier une étape"
      >
        <form onSubmit={handleFormSubmit}>
          <Stack gap="xs">
            <TextInput
              withAsterisk
              label="Nom"
              placeholder="Nom de l'étape"
              defaultValue={stepName}
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
              defaultValue={stepDistance}
              onChange={setDistanceValue}
            />

            <Group justify="flex-end" mt="md">
              <Button color="button.0" type="submit">
                Modifier
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <UnstyledButton className="update-btn" onClick={open}>
        Modifier étape
      </UnstyledButton>
    </>
  );
}

export default UpdateStep;