import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Container,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  em,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { useAppDispatch } from '../../hooks/redux';
import { register } from '../../store/reducers/register';

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Boolean for responsive design
  const isMobile = useMediaQuery(`(max-width: ${em(700)})`);

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

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      register({
        email: emailValue,
        username: usernameValue,
        password: passwordValue,
        confirmation: confirmationValue,
      })
    ).unwrap();

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
      <Stack justify="center" h={'90vh'}>
        <Container w={isMobile ? '80%' : '40%'} className="login-container">
          <Title order={1} size={'1.5rem'}>
            Créer un compte
          </Title>
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
                description="8 caractères minimum, une majuscule et un caractère spécial. "
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
        </Container>
      </Stack>
    </>
  );
}

export default Register;
