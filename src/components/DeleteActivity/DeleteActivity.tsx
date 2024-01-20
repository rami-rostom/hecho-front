import { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Group, Modal, Notification, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { useAppDispatch } from '../../hooks/redux';
import { deleteActivity } from '../../store/reducers/deleteActivity';

function DeleteActivity() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Retrieve ID of the activity
  const { id } = useParams();
  if (!id) throw new Error('Invalid id');

  const [opened, { open, close }] = useDisclosure(false);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Delete the activity then redirect to homepage with confirmation toaster
    await dispatch(deleteActivity(id)).then(() => {
      navigate('/');

      notifications.show({
        color: 'red',
        title: 'Confirmation de la suppression',
        message: 'Votre activité a bien été supprimé.',
      });
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Supprimer l'activité">
        <form onSubmit={handleFormSubmit}>
          <Text>Voulez-vous vraiment supprimer votre activité ?</Text>
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

      <Button
        size="compact-xs"
        color="button.2"
        variant="outline"
        onClick={open}
      >
        Supprimer activité
      </Button>
    </>
  );
}

export default DeleteActivity;
