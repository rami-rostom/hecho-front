import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Container, Group, Text, Title } from '@mantine/core';
import {
  IconBike,
  IconMountain,
  IconRun,
  IconSwimming,
  IconTrekking,
} from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchActivity } from '../../store/reducers/activity';

import './Activity.scss';

function Activity() {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  if (!id) throw new Error('Invalid id');

  const activityData = useAppSelector((state) => state.activity.activity);

  useEffect(() => {
    dispatch(fetchActivity(id));
  }, [dispatch, id]);

  return (
    <Container p="md" className="activity">
      <Container px="-1rem" className="activity__banner">
        <Text tt="uppercase" lts="0.15rem" pb="xs" fw={300}>
          Activité
        </Text>
        <Group justify="space-between">
          <Group>
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

      <Box maw={600} mx="auto" ta="center">
        <Text tt="capitalize">{activityData.sport.name}</Text>
        <Text>{activityData.date_scheduled}</Text>
      </Box>
    </Container>
  );
}

export default Activity;
