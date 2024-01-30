import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { useAppDispatch } from '../../hooks/redux';
import { register } from '../../store/reducers/register';

import './Register.scss';

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [opened, { close, open }] = useDisclosure(false);
  const [emailValue, setEmailValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmationValue, setConfirmationValue] = useState('');

  const handleChangeEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setEmailValue(email);
  };

  const handleChangeUsernameValue = (event: ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value;
    setUsernameValue(username);
  };

  const handleChangePasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPasswordValue(password);
  };

  const handleChangeConfirmationValue = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const confirmation = event.target.value;
    setConfirmationValue(confirmation);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      register({
        email: emailValue,
        username: usernameValue,
        password: passwordValue,
        confirmation: confirmationValue,
      })
    );

    close();
    navigate('/login');

    notifications.show({
      color: 'lime',
      title: 'Confirmation de la création du compte',
      message: 'Tu peux te connecter et planifier tes séances !',
      autoClose: 4000,
      style: { backgroundColor: 'var(--mantine-color-palette-7)' },
    });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xs"
        centered
        title="Créer un compte"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form onSubmit={handleFormSubmit} className="register-form">
          <Stack>
            <TextInput
              label="E-mail"
              placeholder="Saisir une adresse e-mail"
              required
              data-autofocus
              onChange={handleChangeEmailValue}
            />
            <TextInput
              label="Nom d'utilisateur"
              placeholder="Saisir un nom d'utilisateur"
              required
              onChange={handleChangeUsernameValue}
            />
            <PasswordInput
              label="Mot de passe"
              placeholder="Créer un mot de passe"
              required
              onChange={handleChangePasswordValue}
            />
            <PasswordInput
              label="Confirmation du mot de passe"
              placeholder="Saisir la confirmation"
              required
              onChange={handleChangeConfirmationValue}
            />

            <Group justify="flex-end" mt="md">
              <Button color="button.0" type="submit">
                S'inscrire
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <Button
        color="button.0"
        variant="outline"
        size="compact-xs"
        onClick={open}
      >
        Pas encore de compte ? Inscris toi !
      </Button>
    </>
  );
}

export default Register;
