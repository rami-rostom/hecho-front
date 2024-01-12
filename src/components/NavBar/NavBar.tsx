import './NavBar.scss';
import { AppShell, Container, Flex, NavLink, Stack, Text } from '@mantine/core';
import {
  IconBrandFeedly,
  IconRun,
  IconCalendar,
  IconUserFilled,
  IconSettings,
} from '@tabler/icons-react';

function NavBar() {
  return (
    <AppShell.Navbar p="md" bg="darkBg" className="navbar">
      <Flex direction="column" justify="space-between" h="100%">
        <Stack gap="0.3rem" className="navbar__menu">
          <NavLink
            label="Tableau de bord"
            fw={600}
            defaultOpened
            childrenOffset={0}
          >
            <NavLink
              href="#"
              label="Mon flux"
              leftSection={<IconBrandFeedly size="1rem" stroke={1.5} />}
            />
          </NavLink>

          <NavLink
            label="Entraînement"
            fw={600}
            defaultOpened
            childrenOffset={0}
          >
            <NavLink
              href="#"
              label="Mes activités"
              leftSection={<IconRun size="1rem" stroke={1.5} />}
            />
            <NavLink
              href="#"
              label="Mon calendrier"
              leftSection={<IconCalendar size="1rem" stroke={1.5} />}
            />
          </NavLink>

          <NavLink label="Profil" fw={600} defaultOpened childrenOffset={0}>
            <NavLink
              href="#"
              label="Mon profil"
              leftSection={<IconUserFilled size="1rem" stroke={1.5} />}
            />
            <NavLink
              href="#"
              label="Paramètres"
              leftSection={<IconSettings size="1rem" stroke={1.5} />}
            />
          </NavLink>
        </Stack>

        <Container
          my="xl"
          px="xl"
          py="md"
          bg="darkBg.1"
          className="navbar__counter"
        >
          <Text fw={800} ta="center">
            Cette semaine
          </Text>
          <Text size="sm" ta="center">
            Activitées : 0
          </Text>
        </Container>
      </Flex>
    </AppShell.Navbar>
  );
}

export default NavBar;
