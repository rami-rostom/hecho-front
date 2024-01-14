import {
  Box,
  Button,
  Group,
  NativeSelect,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';

function CreateActivity() {
  const form = useForm({
    initialValues: {
      name: '',
      sport_id: '',
      date_scheduled: '',
      hecho: false,
    },
  });

  return (
    <>
      <Title order={1}>Créer une nouvelle activité</Title>
      <Box maw={340} mx="auto">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            withAsterisk
            label="Nom"
            placeholder="Nom de l'activité"
            {...form.getInputProps('name')}
          />
          <NativeSelect
            withAsterisk
            label="Type"
            placeholder="Nom de l'activité"
            data={[
              { label: 'Course à pied', value: '1' },
              { label: 'Trail', value: '2' },
              { label: 'Vélo', value: '3' },
              { label: 'Natation', value: '4' },
              { label: 'Randonnée', value: '5' },
            ]}
            // {...form.getInputProps('date_scheduled')}
          />
          <DateTimePicker
            clearable
            required
            dropdownType="modal"
            valueFormat="DD MMMM YYYY à hh:mm"
            label="Date prévue"
            placeholder="Choisir une date de début"
            minDate={new Date()}
            {...form.getInputProps('date_scheduled')}
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
