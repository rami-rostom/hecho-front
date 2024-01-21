import { useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

type StepProps = {
  stepId: string | undefined;
  stepName: string | undefined;
  stepDuration: string | number | undefined;
  stepDistance: string | number | undefined;
};

function UpdateStep(props: StepProps) {
  const { stepId, stepName, stepDuration, stepDistance } = props;

  const [opened, { close, open }] = useDisclosure(false);
  const [nameValue, setNameValue] = useState('');
  const [durationValue, setDurationValue] = useState<string | undefined>('');
  const [distanceValue, setDistanceValue] = useState<string | number>('');

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
              value={nameValue}
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

      <UnstyledButton onClick={open}>Modifier étape</UnstyledButton>
    </>
  );
}

export default UpdateStep;
