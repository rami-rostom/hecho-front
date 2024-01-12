import './NavBar.scss';
import {
  AppShell,
  Container,
  Flex,
  Group,
  NavLink,
  Stack,
  Text,
} from '@mantine/core';
import {
  IconBrandFeedly,
  IconRun,
  IconCalendar,
  IconUserFilled,
  IconSettings,
  IconTargetArrow,
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
          px="xs"
          py="md"
          bg="darkBg.1"
          className="navbar__counter"
          visibleFrom="sm"
        >
          <Flex align="center" gap="sm" w="100%">
            <IconTargetArrow size="3rem" stroke={1.5} />
            <Group gap="0.1rem" justify="left">
              <Text size="md" fw={800}>
                Activités
              </Text>
              <Text size="xs">Cette semaine : 0</Text>
            </Group>
          </Flex>
        </Container>
      </Flex>
    </AppShell.Navbar>
  );
}

export default NavBar;
