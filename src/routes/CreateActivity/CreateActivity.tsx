import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Group, Select, TextInput, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useAppDispatch } from '../../hooks/redux';
import { createActivity } from '../../store/reducers/createActivity';

function CreateActivity() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        user_id: 1,
        hecho: false,
      })
    ).unwrap();

    // Retrieve new activity ID and redirection to the activity's page
    const { id } = createdActivity;
    navigate(`/activity/${id}`);
  };

  return (
    <>
      <Title order={1}>Créer une nouvelle activité</Title>
      <Box maw={340} mx="auto">
        <form onSubmit={handleFormSubmit}>
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
          />

          <Group justify="flex-end" mt="md">
            <Button color="hecho.6" type="submit">
              Créer l&apos;activité
            </Button>
          </Group>
        </form>
      </Box>
    </>
  );
}

export default CreateActivity;
