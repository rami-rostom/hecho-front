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
  Transition,
} from '@mantine/core';
import { IconLogout, IconSettings, IconUserFilled } from '@tabler/icons-react';

import { useAppSelector } from '../../hooks/redux';

import './Header.scss';
import { useWindowScroll } from '@mantine/hooks';

function Header({ opened, toggle }: { opened: boolean; toggle: () => void }) {
  const isLogged = useAppSelector((state) => state.login.logged);

  const [scroll] = useWindowScroll();

  console.log(scroll.y);

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
                  pl="1.3rem"
                  className="header__logo"
                >
                  Hecho
                </Text>
              </Tooltip>
            </Anchor>

            <Group>
              <Text size="md" fw={500} visibleFrom="sm">
                Hello Rami
              </Text>

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
                  >
                    Profil
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconSettings
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                  >
                    Paramètres
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={
                      <IconLogout style={{ width: rem(14), height: rem(14) }} />
                    }
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
