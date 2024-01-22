import { FormEvent, useEffect, useState } from 'react';

import { Button, Group, Modal, TagsInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTag } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchTag } from '../../store/reducers/getTag';

function AddTag() {
  const dispatch = useAppDispatch();

  const [opened, { close, open }] = useDisclosure(false);
  const [nameValue, setNameValue] = useState('');

  // Render all tags of the user
  useEffect(() => {
    dispatch(fetchTag(1));
  }, [dispatch, 1]);

  const tagsData = useAppSelector((state) => state.getTag.tags);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('test');
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
            description="Appuyez sur entrée pour créer un tag"
            placeholder="Sélectionner ou créer un tag"
            maxTags={1}
            data={tagsData.map((tag) => tag.name)}
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
