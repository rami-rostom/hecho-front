import { FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Badge,
  Button,
  Group,
  Modal,
  TagsInput,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { updateTag as editTag } from '../../../store/reducers/updateTag';

type TagProps = {
  tagId: string;
  tagName: string;
};

function UpdateTag(props: TagProps) {
  const { tagId, tagName } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userId = useAppSelector((state) => state.login.data.userId);

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

    await dispatch(
      editTag({
        id: tagId,
        name: nameValue[0],
        user_id: userId,
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
        title="Modifier un tag"
      >
        <form onSubmit={handleFormSubmit}>
          <TagsInput
            description="Appuyez sur entrée pour modifier le tag"
            placeholder="Modifier le tag"
            maxTags={1}
            defaultValue={[tagName]}
            onChange={handleTagInput}
          />
          <Group justify="flex-end" mt="md">
            <Button color="button.0" variant="outline" onClick={close}>
              Annuler
            </Button>
            <Button color="button.0" type="submit">
              Ajouter
            </Button>
          </Group>
        </form>
      </Modal>

      <UnstyledButton onClick={open}>
        <Badge
          variant="gradient"
          gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
        >
          {tagName}
        </Badge>
      </UnstyledButton>
    </>
  );
}

export default UpdateTag;
