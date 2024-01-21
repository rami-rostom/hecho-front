import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Modal, Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { useAppDispatch } from '../../hooks/redux';
import { fetchActivity } from '../../store/reducers/getActivity';
import { hecho } from '../../store/reducers/hecho';

function Hecho() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Retrieve ID of the activity
  const { id } = useParams();
  if (!id) throw new Error('Invalid id');

  // Render activity page using ID and fetchActivity function
  useEffect(() => {
    dispatch(fetchActivity(id));
  }, [dispatch, id]);

  const [opened, { close, open }] = useDisclosure(false);

  const [dateValue, setDateValue] = useState<string | undefined>('');

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Activity to HECHO then refresh the current page and show success notification
    dispatch(
      hecho({
        id,
        date_accomplished: dateValue,
        hecho: true,
      })
    ).then(() => {
      notifications.show({
        onClose: () => navigate(0),
        color: 'green',
        title: 'Activité HECHO !',
        message: "Bien joué ! Ne t'arrête pas en si bon chemin.",
        autoClose: 3000,
        style: { backgroundColor: 'var(--mantine-color-palette-7)' },
      });
    });
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        size="xs"
        centered
        title="Modification de l'activité"
      >
        <Stack>
          <form onSubmit={handleFormSubmit}>
            <Stack gap="1rem">
              <DatePickerInput
                clearable
                required
                valueFormat="DD MMMM YYYY"
                label="Date accomplissement"
                placeholder="Choisir une date"
                minDate={new Date()}
                onChange={(event) => {
                  const date = event?.toDateString();
                  setDateValue(date);
                }}
              />
              <Button color="button.0" type="submit" onClick={close}>
                HECHO
              </Button>
            </Stack>
          </form>
        </Stack>
      </Modal>

      <Button color="button.2" onClick={open}>
        NO HECHO
      </Button>
    </div>
  );
}

export default Hecho;
