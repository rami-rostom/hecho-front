import { Box, Button, Group, Select, TextInput, Title } from '@mantine/core';
import { FormEvent, useState } from 'react';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
// import { useAppDispatch } from '../../hooks/redux';

function CreateActivity() {
  const form = useForm({
    initialValues: {
      name: '',
      sport_id: '1',
      date_scheduled: '',
      user_id: 1,
      hecho: false,
    },
  });

  // const dispatch = useAppDispatch();
  const [nameValue, setNameValue] = useState('');
  const [typeValue, setTypeValue] = useState<string | null>('');
  const [dateValue, setDateValue] = useState<string | undefined>('');

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(nameValue);
    console.log(typeValue);
    console.log(dateValue);
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
              const date = event?.toString();
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
