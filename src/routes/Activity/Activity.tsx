import { FormEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { DatePickerInput } from '@mantine/dates';
import {
  Button,
  Container,
  Flex,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBike,
  IconMountain,
  IconRun,
  IconSwimming,
  IconTrekking,
} from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchActivity } from '../../store/reducers/activity';
import { hecho } from '../../store/reducers/hecho';

import './Activity.scss';

function Activity() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();
  if (!id) throw new Error('Invalid id');

  const activityData = useAppSelector((state) => state.activity.activity);

  useEffect(() => {
    dispatch(fetchActivity(id));
  }, [dispatch, id]);

  const pace = activityData.duration / activityData.distance;

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
      .then(() => navigate(0));
  };

  return (
    <Container p="md" className="activity">
      <Container px="-1rem" className="activity__banner">
        <Text tt="uppercase" lts="0.15rem" pb="xs" fw={300}>
          Activité
        </Text>
        <Group justify="space-between">
          <Group>
            {/* Dynamic icon based on sport */}
            {activityData.sport.id === 1 && (
              <IconRun size="3rem" className="activity__banner-icon" />
            )}
            {activityData.sport.id === 2 && (
              <IconMountain size="3rem" className="activity__banner-icon" />
            )}
            {activityData.sport.id === 3 && (
              <IconBike size="3rem" className="activity__banner-icon" />
            )}
            {activityData.sport.id === 4 && (
              <IconSwimming size="3rem" className="activity__banner-icon" />
            )}
            {activityData.sport.id === 5 && (
              <IconTrekking size="3rem" className="activity__banner-icon" />
            )}
            <Title order={1}>{activityData.name}</Title>
          </Group>
          <Button color="hecho.9">Modifier l&apos;activité</Button>
        </Group>
      </Container>

      <Container>
        <Flex justify="space-between">
          <Stack align="stretch">
            <Text>STEP 1</Text>
            <Text>STEP 2</Text>
            <Text>STEP 3</Text>
            <Text>STEP 4</Text>
          </Stack>

          <Stack>
            <Stack gap="0rem">
              <Text fw={500} tt="uppercase">
                {activityData.sport.name}
              </Text>
              <Text size="xs" fs="italic">
                Type
              </Text>
            </Stack>

            <Stack gap="0rem">
              <Text fw={500}>{activityData.duration} min</Text>
              <Text size="xs" fs="italic">
                Temps total
              </Text>
            </Stack>

            <Stack gap="0rem">
              <Text fw={500}>{activityData.distance} km</Text>
              <Text size="xs" fs="italic">
                Distance
              </Text>
            </Stack>

            <Stack gap="0rem">
              {pace ? (
                <Text fw={500}>{pace} km/h</Text>
              ) : (
                <Text fw={500}>--</Text>
              )}
              <Text size="xs" fs="italic">
                Allure
              </Text>
            </Stack>

            <Stack gap="0rem">
              <Text fw={500}>{activityData.date_scheduled}</Text>
              <Text size="xs" fs="italic">
                Date prévue
              </Text>
            </Stack>

            <Stack gap="0rem">
              {activityData.date_accomplished ? (
                <Text fw={500}>{activityData.date_accomplished}</Text>
              ) : (
                <Text fw={500}>À réaliser</Text>
              )}
              <Text size="xs" fs="italic">
                Date accomplissement
              </Text>
            </Stack>

            {activityData.hecho ? (
              <Button color="hecho.6">HECHO</Button>
            ) : (
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
                        <Button color="hecho.6" type="submit">
                          HECHO
                        </Button>
                      </Stack>
                    </form>
                  </Stack>
                </Modal>
                <Button color="#f34141" onClick={open}>
                  NO HECHO
                </Button>
              </div>
            )}
          </Stack>
        </Flex>
      </Container>
    </Container>
  );
}

export default Activity;
