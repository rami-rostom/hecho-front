import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Modal, Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';

import { useAppDispatch } from '../../hooks/redux';
import { fetchActivity } from '../../store/reducers/activity';
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

    dispatch(
      hecho({
        id,
        date_accomplished: dateValue,
        hecho: true,
      })
    )
      .unwrap()
      // Refresh the current page
      .then(() => navigate(0));
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
              <Button color="button.1" type="submit">
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
