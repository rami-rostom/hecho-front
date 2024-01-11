import { AppShell, Burger, Group, Image, Anchor, Tooltip } from '@mantine/core';
import './Header.scss';

function Header({ opened, toggle }: { opened: boolean; toggle: () => void }) {
  return (
    <AppShell.Header>
      <Group h="100%" px="md" className="header">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Anchor href="/">
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
      </Group>
    </AppShell.Header>
  );
}

export default Header;
