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

import './RemoveStep.scss';

function RemoveStep() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Supprimer l'étape de l'activité"
      >
        <Text>Voulez-vous vraiment supprimer votre étape ?</Text>
        <Group justify="flex-end" pt="lg" gap="xs">
          <Button color="button.0" variant="outline">
            Annuler
          </Button>
          <Button color="button.2">Supprimer</Button>
        </Group>
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
        <UnstyledButton onClick={open} className="remove-step-icon">
          <IconTrash size="1rem" />
        </UnstyledButton>
      </Tooltip>
    </>
  );
}

export default RemoveStep;
