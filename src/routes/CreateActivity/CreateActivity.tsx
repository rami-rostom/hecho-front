import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Group,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createActivity } from '../../store/reducers/createActivity';

function CreateActivity() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.login.data.userId);

  const [nameValue, setNameValue] = useState('');
  const [typeValue, setTypeValue] = useState<string | null>('');
  const [dateValue, setDateValue] = useState<string | undefined>('');

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Creation of the activity with useState datas
    const createdActivity = await dispatch(
      createActivity({
        name: nameValue,
        sport_id: typeValue,
        date_scheduled: dateValue,
        user_id: userId,
        hecho: false,
      })
    ).unwrap();

    // Retrieve new activity ID and redirection to the activity's page
    const { id } = createdActivity;
    navigate(`/activity/${id}`);

    notifications.show({
      color: 'lime',
      title: 'Confirmation création',
      message: 'Ajoute à présent des étapes à ton activité.',
      autoClose: 3000,
      style: { backgroundColor: 'var(--mantine-color-palette-7)' },
    });
  };

  return (
    <>
      <Stack gap={'xl'} px={'5rem'} py={'xl'}>
        <Title order={1}>Créer une nouvelle activité</Title>
        <Stack px={'15rem'}>
          <form onSubmit={handleFormSubmit}>
            <Stack gap="1rem">
              <TextInput
                withAsterisk
                label="Nom"
                placeholder="Nom de l'activité"
                onChange={(event) => setNameValue(event.target.value)}
              />

              <Select
                withAsterisk
                label="Type"
                placeholder="Type de l'activité"
                data={[
                  { label: 'Course à pied', value: '1' },
                  { label: 'Trail', value: '2' },
                  { label: 'Vélo', value: '3' },
                  { label: 'Natation', value: '4' },
                  { label: 'Randonnée', value: '5' },
                ]}
                onChange={setTypeValue}
              />

              <DatePickerInput
                clearable
                required
                valueFormat="DD MMMM YYYY"
                label="Date prévue"
                placeholder="Choisir une date de début"
                minDate={new Date()}
                onChange={(event) => {
                  const date = event?.toDateString();
                  setDateValue(date);
                }}
                styles={{
                  input: {
                    backgroundColor: 'var(--mantine-color-palette-7)',
                  },
                }}
              />

              <Group justify="flex-end" mt="md">
                <Button color="button.0" type="submit">
                  Créer l&apos;activité
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </>
  );
}

export default CreateActivity;
