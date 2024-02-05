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
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TimeInput } from '@mantine/dates';
import { IconPencil } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { subDurations, sumDurations } from '../../../utils/calculation';
import { updateStep } from '../../../store/reducers/updateStep';
import { updateActivity } from '../../../store/reducers/updateActivity';

type StepProps = {
  stepId: string;
  stepName: string | undefined;
  stepDistance: number;
  stepDuration: string;
  activityDuration: string;
  activityDistance: number;
};

function UpdateStep(props: StepProps) {
  const {
    stepId,
    stepName,
    stepDistance,
    stepDuration,
    activityDuration,
    activityDistance,
  } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.login.data.userId);

  // Retrieve ID of the activity
  const { id } = useParams();
  if (!id) throw new Error('Invalid id');

  const [opened, { close, open }] = useDisclosure(false);
  const [nameValue, setNameValue] = useState('');
  const [newDurationValue, setNewDurationValue] = useState<string>('');
  const [newDistanceValue, setNewDistanceValue] = useState<string | number>('');
  const [typeValue, setTypeValue] = useState<string | null>('');

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTypeValue('');

    // Original duration of the activity before adding this step
    const resetDuration = subDurations(activityDuration, stepDuration);

    // Update the step with useState datas
    await dispatch(
      updateStep({
        id: stepId,
        name: nameValue,
        duration: newDurationValue,
        distance: Number(newDistanceValue),
        user_id: userId,
      })
    );

    if (newDurationValue === '') {
      await dispatch(
        updateActivity({
          id,
          duration: activityDuration,
          distance:
            Number(activityDistance) -
            Number(stepDistance) +
            Number(newDistanceValue),
          name: '',
          sport_id: null,
          date_scheduled: '',
          date_accomplished: '',
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

    if (newDistanceValue === '') {
      await dispatch(
        updateActivity({
          id,
          duration: sumDurations(resetDuration, newDurationValue),
          distance:
            Number(activityDistance) -
            Number(stepDistance) +
            Number(newDistanceValue),
          name: '',
          sport_id: null,
          date_scheduled: '',
          date_accomplished: '',
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

    if (newDurationValue != '' && newDistanceValue != '') {
      await dispatch(
        updateActivity({
          id,
          duration: sumDurations(resetDuration, newDurationValue),
          distance:
            Number(activityDistance) -
            Number(stepDistance) +
            Number(newDistanceValue),
          name: '',
          sport_id: null,
          date_scheduled: '',
          date_accomplished: '',
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
        title="Modifier une étape"
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
              defaultValue={stepName}
              onChange={(event) => setNameValue(event.target.value)}
            />

            {typeValue == '1' && (
              <TimeInput
                withSeconds
                withAsterisk
                label="Durée"
                description="hh-mm-ss"
                onChange={(event) => setNewDurationValue(event.target.value)}
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
                onChange={setNewDistanceValue}
              />
            )}

            {typeValue == '3' && (
              <>
                <TimeInput
                  withSeconds
                  withAsterisk
                  label="Durée"
                  description="hh-mm-ss"
                  onChange={(event) => setNewDurationValue(event.target.value)}
                />

                <NumberInput
                  withAsterisk
                  label="Distance"
                  description="Décimale possible"
                  suffix=" km"
                  placeholder="Distance de l'étape"
                  min={0}
                  onChange={setNewDistanceValue}
                />
              </>
            )}

            <Group justify="flex-end" mt="md">
              <Button color="button.0" type="submit">
                Modifier
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Tooltip
        label="Modifier l'étape"
        position="top"
        offset={8}
        openDelay={300}
        closeDelay={150}
        transitionProps={{ transition: 'slide-up', duration: 200 }}
        withArrow
      >
        <UnstyledButton onClick={open}>
          <IconPencil size="1.2rem" />
        </UnstyledButton>
      </Tooltip>
    </>
  );
}

export default UpdateStep;
