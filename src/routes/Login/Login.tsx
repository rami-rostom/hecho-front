import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Anchor,
  Button,
  Container,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';

import { useAppDispatch } from '../../hooks/redux';
import { login } from '../../store/reducers/login';

import './Login.scss';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleChangeEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setEmailValue(email);
  };

  const handleChangePasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPasswordValue(password);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      login({
        email: emailValue,
        password: passwordValue,
      })
    );

    navigate('/');
  };

  return (
    <>
      <Stack justify="center" h={'90vh'}>
        <Container className="login-container">
          <Title order={1} size={'1.5rem'}>
            Se connecter
          </Title>
          <form onSubmit={handleFormSubmit} className="login-form">
            <Stack gap={'xs'} w={'100%'}>
              <TextInput
                label="E-mail"
                placeholder="Saisir une adresse e-mail"
                required
                defaultValue={'ramirez@hecho.io'}
                onChange={handleChangeEmailValue}
              />
              <PasswordInput
                label="Mot de passe"
                placeholder="Saisir un mot de passe"
                required
                defaultValue={'Password1!'}
                onChange={handleChangePasswordValue}
              />
            </Stack>
            <Group justify="center" grow mt={'lg'}>
              <Button color="button.0" type="submit">
                Se connecter
              </Button>
            </Group>
          </form>
          <Anchor href="#" size="sm" c={'palette.4'}>
            Mot de passe oublié ?
          </Anchor>
        </Container>
      </Stack>
    </>
  );
}

export default Login;
