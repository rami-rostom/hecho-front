import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ActionIcon,
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
  IconArrowBarRight,
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
              variant="subtle"
              color="white"
              size={'sm'}
              onClick={toggleNavBar}
            >
              <IconArrowBarRight />
            </ActionIcon>
          )}
          <Flex direction="column" justify="space-between" h="100%">
            <Stack gap="0.3rem" className="navbarmini__menu" align="center">
              <NavLink childrenOffset={0} defaultOpened disabled>
                <NavLink
                  href="/"
                  leftSection={<IconBrandFeedly size="1.3rem" stroke={1.5} />}
                  className="navbarmini__link"
                />
              </NavLink>

              <NavLink childrenOffset={0} defaultOpened disabled>
                <NavLink
                  onClick={handleCreateActivityModal}
                  leftSection={<IconCalendarPlus size="1.3rem" stroke={1.5} />}
                  className="navbarmini__link"
                />
                {/* Component to open create activity modal */}
                <NavBarCreateActivity
                  isOpen={isCreateActivityModalOpen}
                  onClose={() => setCreateActivityModalOpen(false)}
                />

                <NavLink
                  href={`/activities/user/${usernameSlug}`}
                  leftSection={<IconRun size="1.3rem" stroke={1.5} />}
                  className="navbarmini__link"
                />
                <NavLink
                  href="#"
                  leftSection={<IconCalendar size="1.3rem" stroke={1.5} />}
                  className="navbarmini__link"
                />
              </NavLink>

              <NavLink childrenOffset={0} defaultOpened disabled>
                <NavLink
                  href="#"
                  leftSection={<IconUserFilled size="1.3rem" stroke={1.5} />}
                  className="navbarmini__link"
                />
                <NavLink
                  href="#"
                  leftSection={<IconSettings size="1.3rem" stroke={1.5} />}
                  className="navbarmini__link"
                />
                <NavLink
                  c={'button.2'}
                  onClick={handleLogout}
                  leftSection={<IconLogout size="1.3rem" stroke={1.5} />}
                  className="navbarmini__link"
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
                className="navbarmini__counter"
                visibleFrom="sm"
              >
                <Stack align="center" gap={'xs'}>
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
