import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Group,
  TextInput,
  Title,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCircleCheck, IconCircleX, IconPencil } from '@tabler/icons-react';

import { useAppDispatch } from '../../../hooks/redux';
import { updateActivity } from '../../../store/reducers/updateActivity';

type ActivityProps = {
  activityId: string;
  activityName: string;
};

function UpdateActivityName(props: ActivityProps) {
  const { activityId, activityName } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [openNameHandler, nameHandler] = useDisclosure(false);
  const [nameValue, setNameValue] = useState('');

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      updateActivity({
        id: activityId,
        name: nameValue,
        sport_id: null,
        distance: 0,
        duration: '',
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
  };
  return (
    <>
      {!openNameHandler ? (
        <>
          <Title order={1}>{activityName}</Title>

          <UnstyledButton onClick={() => nameHandler.open()}>
            <Tooltip
              label="Modifier le nom"
              position="right"
              offset={5}
              openDelay={300}
              closeDelay={150}
              transitionProps={{
                transition: 'slide-left',
                duration: 200,
              }}
              withArrow
            >
              <IconPencil size="1.2rem" />
            </Tooltip>
          </UnstyledButton>
        </>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <Group gap={'sm'}>
            <TextInput
              defaultValue={activityName}
              onChange={(event) => setNameValue(event.target.value)}
            />
            <Group gap={'0.1rem'}>
              <UnstyledButton type="submit">
                <IconCircleCheck color="var(--mantine-color-button-0)" />
              </UnstyledButton>

              <UnstyledButton onClick={() => nameHandler.close()}>
                <IconCircleX color="var(--mantine-color-button-4)" />
              </UnstyledButton>
            </Group>
          </Group>
        </form>
      )}
    </>
  );
}

export default UpdateActivityName;
