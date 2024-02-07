import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AppShell,
  Container,
  Flex,
  Group,
  NavLink,
  Stack,
  Text,
  Tooltip,
  em,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import {
  IconBrandFeedly,
  IconRun,
  IconCalendar,
  IconUserFilled,
  IconSettings,
  IconTargetArrow,
  IconCalendarPlus,
  IconLogout,
} from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/reducers/login';
import NavBarCreateActivity from '../Activity/NavBarCreateActivity/NavBarCreateActivity';

import './NavBar.scss';

function NavBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLogged = useAppSelector((state) => state.login.logged);
  const usernameSlug = useAppSelector(
    (state) => state.login.data.username_slug
  );

  // Retrieve user activities from state
  const activitiesData = useAppSelector(
    (state) => state.getUserActivities.activity
  );

  // Filter last seven days done activties
  const [activitiesThisWeek, setActivitiesThisWeek] = useState(activitiesData);

  const filteredActivities = activitiesData.filter((activity) => {
    if (activity.date_accomplished) {
      const differenceInMs =
        Number(new Date()) - Number(new Date(activity.date_accomplished));

      const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

      return differenceInDays <= 7;
    }
  });

  useEffect(() => {
    setActivitiesThisWeek(filteredActivities);
  }, [activitiesData]);

  const nbActivitiesThisWeek = activitiesThisWeek.length;

  // Function to empty local storage and to disconnect user
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Boolean for responsive design
  const isBurger = useMediaQuery(`(max-width: ${em(767)})`);

  // Open and close create activity modal on navlink click
  const [isCreateActivityModalOpen, setCreateActivityModalOpen] =
    useState(false);

  const handleCreateActivityModal = () => {
    setCreateActivityModalOpen(true);
  };

  return (
    <>
      {!isLogged ? (
        <AppShell navbar={{ width: 0, breakpoint: 'none' }}></AppShell>
      ) : (
        <AppShell.Navbar p="md" bg="palette.5" className="navbar">
          <Flex direction="column" justify="space-between" h="100%">
            <Stack gap="0.3rem" className="navbar__menu">
              {isBurger && (
                <Text size="md" fw={500} tt={'capitalize'} pl={'sm'} pb={'sm'}>
                  Hello {usernameSlug}
                </Text>
              )}

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
                  onClick={handleCreateActivityModal}
                  label="Nouvelle activité"
                  leftSection={<IconCalendarPlus size="1rem" stroke={1.5} />}
                  className="navbar__link"
                />
                {/* Component to open create activity modal */}
                <NavBarCreateActivity
                  isOpen={isCreateActivityModalOpen}
                  onClose={() => setCreateActivityModalOpen(false)}
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
                <NavLink
                  c={'button.2'}
                  onClick={handleLogout}
                  label="Se déconnecter"
                  leftSection={<IconLogout size="1rem" stroke={1.5} />}
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
                my="md"
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
                    <Text size="xs">
                      Cette semaine : {nbActivitiesThisWeek}
                    </Text>
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
