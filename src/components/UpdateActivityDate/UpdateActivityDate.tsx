import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Modal, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil } from '@tabler/icons-react';

import { updateActivity } from '../../store/reducers/updateActivity';
import { useAppDispatch } from '../../hooks/redux';

type ActivityProps = {
  activityId: string;
  scheduledDate: boolean;
};

function UpdateActivityDate(props: ActivityProps) {
  const { activityId, scheduledDate } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [opened, { close, open }] = useDisclosure(false);
  const [dateScheduledValue, setDateScheduledValue] = useState<
    string | undefined
  >('');
  const [dateAccomplishedValue, setDateAccomplishedValue] = useState<
    string | undefined
  >('');

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      updateActivity({
        id: activityId,
        date_scheduled: dateScheduledValue,
        date_accomplished: dateAccomplishedValue,
      })
    ).then(() => navigate(0));
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xs"
        centered
        title="Modification de la date"
      >
        <form onSubmit={handleFormSubmit}>
          <Stack gap="1rem">
            {scheduledDate ? (
              <DatePickerInput
                clearable
                valueFormat="DD MMMM YYYY"
                label="Date prévue"
                placeholder="Choisir une date"
                onChange={(event) => {
                  const date = event?.toDateString();
                  setDateScheduledValue(date);
                }}
              />
            ) : (
              <DatePickerInput
                clearable
                valueFormat="DD MMMM YYYY"
                label="Date accomplissement"
                placeholder="Choisir une date"
                onChange={(event) => {
                  const date = event?.toDateString();
                  setDateAccomplishedValue(date);
                }}
              />
            )}
            <Button color="button.0" type="submit" onClick={close}>
              Modifier
            </Button>
          </Stack>
        </form>
      </Modal>

      <UnstyledButton onClick={open}>
        <Tooltip
          label="Modifier"
          position="right"
          offset={5}
          openDelay={300}
          closeDelay={150}
          transitionProps={{
            transition: 'slide-up',
            duration: 200,
          }}
          withArrow
        >
          <IconPencil size="1rem" />
        </Tooltip>
      </UnstyledButton>
    </>
  );
}

export default UpdateActivityDate;
