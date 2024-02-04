import {
  AppShell,
  AppShellNavbar,
  Container,
  Flex,
  Group,
  NavLink,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';

import {
  IconBrandFeedly,
  IconRun,
  IconCalendar,
  IconUserFilled,
  IconSettings,
  IconTargetArrow,
  IconCalendarPlus,
} from '@tabler/icons-react';

import { useAppSelector } from '../../hooks/redux';

import './NavBar.scss';

function NavBar() {
  const isLogged = useAppSelector((state) => state.login.logged);
  const usernameSlug = useAppSelector(
    (state) => state.login.data.username_slug
  );

  return (
    <>
      {!isLogged ? (
        <AppShell navbar={{ width: 0, breakpoint: 'none' }}></AppShell>
      ) : (
        <AppShell.Navbar p="md" bg="palette.5" className="navbar">
          <Flex direction="column" justify="space-between" h="100%">
            <Stack gap="0.3rem" className="navbar__menu">
              <NavLink
                label="Tableau de bord"
                fw={600}
                defaultOpened
                childrenOffset={0}
                className="navbar__link"
              >
                <NavLink
                  href="/"
                  label="Mon flux"
                  leftSection={<IconBrandFeedly size="1rem" stroke={1.5} />}
                  className="navbar__link"
                />
              </NavLink>

              <NavLink
                label="Entraînement"
                fw={600}
                defaultOpened
                childrenOffset={0}
                className="navbar__link"
              >
                <NavLink
                  href="/activity/create"
                  label="Nouvelle activité"
                  leftSection={<IconCalendarPlus size="1rem" stroke={1.5} />}
                  className="navbar__link"
                />
                <NavLink
                  href={`/activities/user/${usernameSlug}`}
                  label="Mes activités"
                  leftSection={<IconRun size="1rem" stroke={1.5} />}
                  className="navbar__link"
                />
                <NavLink
                  href="#"
                  label="Mon calendrier"
                  leftSection={<IconCalendar size="1rem" stroke={1.5} />}
                  className="navbar__link"
                />
              </NavLink>

              <NavLink
                label="Profil"
                fw={600}
                defaultOpened
                childrenOffset={0}
                className="navbar__link"
              >
                <NavLink
                  href="#"
                  label="Mon profil"
                  leftSection={<IconUserFilled size="1rem" stroke={1.5} />}
                  className="navbar__link"
                />
                <NavLink
                  href="#"
                  label="Paramètres"
                  leftSection={<IconSettings size="1rem" stroke={1.5} />}
                  className="navbar__link"
                />
              </NavLink>
            </Stack>

            {/* Tooltip when hover on the counter container */}
            <Tooltip
              label="Objectif hebdomadaire"
              position="top"
              offset={8}
              openDelay={300}
              closeDelay={150}
              transitionProps={{ transition: 'slide-up', duration: 200 }}
              withArrow
            >
              <Container
                my="xl"
                px="xs"
                py="md"
                bg="palette.7"
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
            </Tooltip>
          </Flex>
        </AppShell.Navbar>
      )}
    </>
  );
}

export default NavBar;
