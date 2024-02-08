import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ActionIcon,
  AppShell,
  Container,
  Flex,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
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
  IconChevronRight,
} from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/reducers/login';
import { fetchUserActivities } from '../../store/reducers/getUserActivities';
import NavBarCreateActivity from '../Activity/NavBarCreateActivity/NavBarCreateActivity';

import './NavBarMini.scss';

type toggleProps = {
  toggleNavBar: () => void;
};

function NavBarMini({ toggleNavBar }: toggleProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const id = useAppSelector((state) => state.login.data.userId);
  const isLogged = useAppSelector((state) => state.login.logged);
  const usernameSlug = useAppSelector(
    (state) => state.login.data.username_slug
  );

  // Fetch all user activities
  useEffect(() => {
    dispatch(fetchUserActivities(id));
  }, [dispatch, id]);

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
        <AppShell.Navbar bg="palette.5" className="navbarmini">
          {!isBurger && (
            <ActionIcon
              variant="outline"
              color="palette.4"
              size={'xs'}
              onClick={toggleNavBar}
              className="navbarmini__toggle"
            >
              <IconChevronRight />
            </ActionIcon>
          )}
          <Flex direction="column" justify="space-between" h="100%">
            <Stack gap="2.5rem" className="navbarmini__menu" align="center">
              <Stack gap={'xs'} className="navbarmini__link">
                <Tooltip
                  label="Mon flux"
                  position="right"
                  offset={8}
                  openDelay={300}
                  closeDelay={150}
                  transitionProps={{ transition: 'slide-left', duration: 200 }}
                  withArrow
                >
                  <UnstyledButton component={'a'} href="/">
                    <IconBrandFeedly size="1.5rem" stroke={1.5} />
                  </UnstyledButton>
                </Tooltip>
              </Stack>

              <Stack gap={'xs'} align="center">
                <Stack className="navbarmini__link">
                  <Tooltip
                    label="Nouvelle activité"
                    position="right"
                    offset={8}
                    openDelay={300}
                    closeDelay={150}
                    transitionProps={{
                      transition: 'slide-left',
                      duration: 200,
                    }}
                    withArrow
                  >
                    <UnstyledButton onClick={handleCreateActivityModal}>
                      <IconCalendarPlus size="1.5rem" stroke={1.5} />
                    </UnstyledButton>
                  </Tooltip>
                </Stack>
                {/* Component to open create activity modal */}
                <NavBarCreateActivity
                  isOpen={isCreateActivityModalOpen}
                  onClose={() => setCreateActivityModalOpen(false)}
                />

                <Stack className="navbarmini__link">
                  <Tooltip
                    label="Mes activités"
                    position="right"
                    offset={8}
                    openDelay={300}
                    closeDelay={150}
                    transitionProps={{
                      transition: 'slide-left',
                      duration: 200,
                    }}
                    withArrow
                  >
                    <UnstyledButton
                      component={'a'}
                      href={`/activities/user/${usernameSlug}`}
                      className="navbarmini__link"
                    >
                      <IconRun size="1.5rem" stroke={1.5} />
                    </UnstyledButton>
                  </Tooltip>
                </Stack>

                <Stack className="navbarmini__link">
                  <Tooltip
                    label="Mon calendrier"
                    position="right"
                    offset={8}
                    openDelay={300}
                    closeDelay={150}
                    transitionProps={{
                      transition: 'slide-left',
                      duration: 200,
                    }}
                    withArrow
                  >
                    <UnstyledButton
                      component={'a'}
                      href="#"
                      className="navbarmini__link"
                    >
                      <IconCalendar size="1.5rem" stroke={1.5} />
                    </UnstyledButton>
                  </Tooltip>
                </Stack>
              </Stack>

              <Stack gap={'xs'} align="center">
                <Stack className="navbarmini__link">
                  <Tooltip
                    label="Mon profil"
                    position="right"
                    offset={8}
                    openDelay={300}
                    closeDelay={150}
                    transitionProps={{
                      transition: 'slide-left',
                      duration: 200,
                    }}
                    withArrow
                  >
                    <UnstyledButton
                      component={'a'}
                      href="#"
                      className="navbarmini__link"
                    >
                      <IconUserFilled size="1.5rem" stroke={1.5} />
                    </UnstyledButton>
                  </Tooltip>
                </Stack>

                <Stack className="navbarmini__link">
                  <Tooltip
                    label="Paramètres"
                    position="right"
                    offset={8}
                    openDelay={300}
                    closeDelay={150}
                    transitionProps={{
                      transition: 'slide-left',
                      duration: 200,
                    }}
                    withArrow
                  >
                    <UnstyledButton
                      component={'a'}
                      href="#"
                      className="navbarmini__link"
                    >
                      <IconSettings size="1.5rem" stroke={1.5} />
                    </UnstyledButton>
                  </Tooltip>
                </Stack>

                <Stack className="navbarmini__link">
                  <Tooltip
                    label="Se déconnecter"
                    position="right"
                    offset={8}
                    openDelay={300}
                    closeDelay={150}
                    transitionProps={{
                      transition: 'slide-left',
                      duration: 200,
                    }}
                    withArrow
                  >
                    <UnstyledButton
                      c={'button.2'}
                      onClick={handleLogout}
                      className="navbarmini__link"
                    >
                      <IconLogout size="1.5rem" stroke={1.5} />
                    </UnstyledButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Stack>

            {/* Tooltip when hover on the counter container */}
            <Tooltip
              label="Objectif hebdomadaire"
              position="right"
              offset={8}
              openDelay={300}
              closeDelay={150}
              transitionProps={{ transition: 'slide-left', duration: 200 }}
              withArrow
            >
              <Container
                my="md"
                px="xs"
                py="md"
                bg="palette.7"
                className="navbarmini__counter"
                visibleFrom="sm"
              >
                <Stack align="center" gap={'0.2rem'}>
                  <IconTargetArrow size="1.5rem" stroke={1.5} />
                  <Text size="md">{nbActivitiesThisWeek}</Text>
                </Stack>
              </Container>
            </Tooltip>
          </Flex>
        </AppShell.Navbar>
      )}
    </>
  );
}

export default NavBarMini;
