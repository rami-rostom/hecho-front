import { useState, FormEvent } from 'react';

import {
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { TimeInput } from '@mantine/dates';

function Step() {
  const [opened, { close, open }] = useDisclosure(false);

  const [nameValue, setNameValue] = useState('');
  const [durationValue, setDurationValue] = useState<string | undefined>('');
  const [distanceValue, setDistanceValue] = useState<string | number>('');

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(nameValue);
    console.log(typeof nameValue);
    console.log(durationValue);
    console.log(typeof durationValue);
    console.log(distanceValue);
    console.log(typeof distanceValue);
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

export default Step;
