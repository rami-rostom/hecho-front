import {
  AppShell,
  Burger,
  Group,
  Image,
  Anchor,
  Tooltip,
  Avatar,
  Text,
  Menu,
  rem,
} from '@mantine/core';
import { IconLogout, IconSettings, IconUserFilled } from '@tabler/icons-react';
import './Header.scss';

function Header({ opened, toggle }: { opened: boolean; toggle: () => void }) {
  return (
    <AppShell.Header>
      <Group h="100%" px="xl" className="header" justify="space-between">
        {/* Responsive navbar, tranform to a burger when the breakpoint is hit */}
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        <Anchor href="/">
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
            <Image src="hecho-logo.png" h={30} />
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
                transitionProps={{ transition: 'slide-right', duration: 200 }}
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
                  <IconUserFilled style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Profil
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />
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
  );
}

export default Header;
