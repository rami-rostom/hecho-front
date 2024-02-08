import { useNavigate } from 'react-router-dom';

import {
  AppShell,
  Burger,
  Group,
  Anchor,
  Tooltip,
  Avatar,
  Text,
  Menu,
  rem,
  Button,
  em,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconLogout, IconSettings, IconUserFilled } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { LocalStorage } from '../../utils/LocalStorage';
import { logout } from '../../store/reducers/login';

import './Header.scss';

function Header({ opened, toggle }: { opened: boolean; toggle: () => void }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLogged = useAppSelector((state) => state.login.logged);

  // Retrieve user datas from local storage
  const userAuth = LocalStorage.getItem('user');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Boolean for responsive design
  const isMobile = useMediaQuery(`(max-width: ${em(600)})`);

  return (
    <>
      {!isLogged && (
        <AppShell.Header
          bg="palette.5"
          withBorder={false}
          className="header-unlogged"
        >
          <Group
            h="100%"
            px="xl"
            py="lg"
            className="header"
            justify="space-between"
          >
            <Anchor href="/" underline="never">
              {/* Tooltip when hover on the logo */}
              <Tooltip
                label="Home"
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
                <Text
                  c="palette.0"
                  size="2.5rem"
                  tt="uppercase"
                  pl="1rem"
                  className="header__logo"
                >
                  Hecho
                </Text>
              </Tooltip>
            </Anchor>

            <Group>
              <Button
                color="button.0"
                variant="outline"
                size="xs"
                radius="xl"
                pr="1rem"
                component="a"
                href="/login"
              >
                Se connecter
              </Button>
            </Group>
          </Group>
        </AppShell.Header>
      )}

      {isLogged && (
        <AppShell.Header bg="palette.5">
          <Group h="100%" px="xl" className="header" justify="space-between">
            {/* Responsive navbar, tranform to a burger when the breakpoint is hit */}
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            <Anchor href="/" underline="never">
              {/* Tooltip when hover on the logo */}
              <Tooltip
                label="Home"
                position="right"
                offset={8}
                openDelay={300}
                closeDelay={150}
                transitionProps={{ transition: 'slide-left', duration: 200 }}
                withArrow
              >
                <Text
                  c="palette.0"
                  size="2.5rem"
                  tt="uppercase"
                  pl={isMobile ? '0rem' : '1.3rem'}
                  className="header__logo"
                >
                  Hecho
                </Text>
              </Tooltip>
            </Anchor>

            <Group>
              {/* If user is logged, render his username */}
              {userAuth && (
                <Text size="md" fw={500} visibleFrom="sm">
                  Hello {userAuth.data.username}
                </Text>
              )}

              {/* Menu dropdown on click on avatar */}
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  {/* Tooltip when hover on the avatar */}
                  <Tooltip
                    label="Profil"
                    position="left"
                    offset={5}
                    openDelay={300}
                    closeDelay={150}
                    transitionProps={{
                      transition: 'slide-right',
                      duration: 200,
                    }}
                    withArrow
                  >
                    <Avatar
                      src={null}
                      className="header__avatar"
                      visibleFrom="xs"
                    />
                  </Tooltip>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconUserFilled
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    className="menu-item"
                  >
                    Profil
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconSettings
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    className="menu-item"
                  >
                    Paramètres
                  </Menu.Item>
                  <Menu.Item
                    color="button.2"
                    onClick={handleLogout}
                    leftSection={
                      <IconLogout style={{ width: rem(14), height: rem(14) }} />
                    }
                    className="menu-item"
                  >
                    Déconnexion
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </AppShell.Header>
      )}
    </>
  );
}

export default Header;
