import { AppShell, Burger, Group } from '@mantine/core';

function Header({ opened, toggle }: { opened: boolean; toggle: () => void }) {
  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <div>Hecho</div>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </Group>
    </AppShell.Header>
  );
}

export default Header;
