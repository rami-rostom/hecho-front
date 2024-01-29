import { useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TimeInput } from '@mantine/dates';
import { IconPlus } from '@tabler/icons-react';

import { useAppDispatch } from '../../../hooks/redux';
import { sumDurations } from '../../../utils/calculation';
import { createStep } from '../../../store/reducers/createStep';
import { addStep } from '../../../store/reducers/addStep';
import { updateActivity } from '../../../store/reducers/updateActivity';

type ActivityProps = {
  activityDuration: string;
  activityDistance: number;
};

function AddStep(props: ActivityProps) {
  const { activityDuration, activityDistance } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Retrieve ID of the activity
  const { id } = useParams();
  if (!id) throw new Error('Invalid id');

  const [opened, { close, open }] = useDisclosure(false);
  const [nameValue, setNameValue] = useState('');
  const [durationValue, setDurationValue] = useState<string>('');
  const [distanceValue, setDistanceValue] = useState<number>();
  const [typeValue, setTypeValue] = useState<string | null>('');

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTypeValue('');

    const newDuration = sumDurations(activityDuration, durationValue);

    // User select distance as type
    if (durationValue === '') {
      // Creation of the step with useState datas
      const createdStep = await dispatch(
        createStep({
          name: nameValue,
          distance: distanceValue,
          duration: '',
          user_id: 1,
        })
      ).unwrap();

      // Retrieve new step ID and redirection to the activity's page
      const stepId = createdStep.id;

      // Add the new step to the workout
      await dispatch(
        addStep({
          step_id: stepId,
          workoutId: id,
        })
      );

      // Update activity details with new distance and duration
      await dispatch(
        updateActivity({
          id,
          duration: activityDuration,
          distance: Number(activityDistance) + Number(distanceValue),
          name: '',
          sport_id: null,
          pace: 0,
          user_id: 0,
          hecho: false,
          sport: {
            id: 0,
            name: undefined,
          },
          steps: [],
          tags: [],
        })
      ).then(() => navigate(0));
    }

    // User select duration as type
    if (distanceValue === undefined) {
      const createdStep = await dispatch(
        createStep({
          name: nameValue,
          distance: null,
          duration: durationValue,
          user_id: 1,
        })
      ).unwrap();

      const stepId = createdStep.id;

      await dispatch(
        addStep({
          step_id: stepId,
          workoutId: id,
        })
      );

      await dispatch(
        updateActivity({
          id,
          duration: newDuration,
          distance: activityDistance,
          name: '',
          sport_id: null,
          pace: 0,
          user_id: 0,
          hecho: false,
          sport: {
            id: 0,
            name: undefined,
          },
          steps: [],
          tags: [],
        })
      ).then(() => navigate(0));
    }

    // User select distance and duration as type
    if (distanceValue && durationValue) {
      const createdStep = await dispatch(
        createStep({
          name: nameValue,
          distance: distanceValue,
          duration: durationValue,
          user_id: 1,
        })
      ).unwrap();

      const stepId = createdStep.id;

      await dispatch(
        addStep({
          step_id: stepId,
          workoutId: id,
        })
      );

      await dispatch(
        updateActivity({
          id,
          duration: newDuration,
          distance: Number(activityDistance) + Number(distanceValue),
          name: '',
          sport_id: null,
          pace: 0,
          user_id: 0,
          hecho: false,
          sport: {
            id: 0,
            name: undefined,
          },
          steps: [],
          tags: [],
        })
      ).then(() => navigate(0));
    }
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
            <Select
              withAsterisk
              label="Type"
              placeholder="Type de durée"
              data={[
                { label: 'Durée', value: '1' },
                { label: 'Distance', value: '2' },
                { label: 'Durée & distance', value: '3' },
              ]}
              onChange={setTypeValue}
            />

            <TextInput
              withAsterisk
              label="Nom"
              placeholder="Nom de l'étape"
              onChange={(event) => setNameValue(event.target.value)}
            />

            {typeValue == '1' && (
              <TimeInput
                withSeconds
                withAsterisk
                label="Durée"
                description="hh-mm-ss"
                onChange={(event) => setDurationValue(event.target.value)}
              />
            )}

            {typeValue == '2' && (
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
            )}

            {typeValue == '3' && (
              <>
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
              </>
            )}

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

export default AddStep;
