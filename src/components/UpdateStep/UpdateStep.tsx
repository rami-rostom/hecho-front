import { useState, FormEvent, useEffect } from 'react';

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
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchStep } from '../../store/reducers/getStep';

type StepProps = {
  stepId: string;
};

function UpdateStep(props: StepProps) {
  const { stepId } = props;

  const dispatch = useAppDispatch();

  const [opened, { close, open }] = useDisclosure(false);
  const [nameValue, setNameValue] = useState('');
  const [durationValue, setDurationValue] = useState<string | undefined>('');
  const [distanceValue, setDistanceValue] = useState<string | number>('');

  // Render activity page using ID and fetchActivity function
  useEffect(() => {
    dispatch(fetchStep(stepId));
  }, [dispatch, stepId]);

  const stepData = useAppSelector((state) => state.getStep.step);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
              value={stepData.name}
              onChange={(event) => setNameValue(event.target.value)}
            />

            <TimeInput
              withSeconds
              withAsterisk
              label="Durée"
              description="hh-mm-ss"
              value={stepData.duration}
              onChange={(event) => setDurationValue(event.target.value)}
            />

            <NumberInput
              withAsterisk
              label="Distance"
              description="Décimale possible"
              suffix=" km"
              placeholder="Distance de l'étape"
              min={0}
              value={stepData.distance}
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

      <UnstyledButton onClick={open}>Modifier étape</UnstyledButton>
    </>
  );
}

export default UpdateStep;
