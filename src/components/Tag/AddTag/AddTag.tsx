import { FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Group, Modal, TagsInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTag } from '@tabler/icons-react';

import { useAppDispatch } from '../../../hooks/redux';
import { createTag } from '../../../store/reducers/createTag';
import { addTag } from '../../../store/reducers/addTag';

function AddTag() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Retrieve ID of the activity
  const { id } = useParams();
  if (!id) throw new Error('Invalid id');

  const [opened, { close, open }] = useDisclosure(false);
  const [nameValue, setNameValue] = useState('');

  const handleTagInput = (name: any) => {
    setNameValue(name);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // First step is to create the tag
    const createdTag = await dispatch(
      createTag({
        name: nameValue[0],
        user_id: 1,
      })
    ).unwrap();

    const tagId = createdTag.id;

    // Second step is to add the created tag to the workout
    await dispatch(
      addTag({
        tag_id: tagId,
        workoutId: id,
      })
    ).then(() => navigate(0));
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="sm"
        centered
        title="Ajouter un tag"
      >
        <form onSubmit={handleFormSubmit}>
          <TagsInput
            description="Appuyez sur entrée pour créer le tag"
            placeholder="Créer un tag"
            maxTags={1}
            onChange={handleTagInput}
          />
          <Group justify="flex-end" mt="md">
            <Button color="button.0" type="submit">
              Ajouter
            </Button>
          </Group>
        </form>
      </Modal>

      <Button
        color="button.4"
        size="compact-xs"
        variant="outline"
        onClick={open}
      >
        <IconTag size="0.9rem" className="activity__steps-button" />
        Ajouter un tag
      </Button>
    </>
  );
}

export default AddTag;
