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

import './Login.scss';

function Login() {
  return (
    <>
      <Stack justify="center" h={'90vh'}>
        <Container className="login-container">
          <Title order={1} size={'1.5rem'}>
            Se connecter
          </Title>
          <form className="login-form">
            <Stack gap={'xs'} w={'100%'}>
              <TextInput
                label="E-mail"
                placeholder="Saisir une adresse e-mail"
                required
              />
              <PasswordInput
                label="Mot de passe"
                placeholder="Saisir un mot de passe"
                required
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
