import { AppShell, NavLink } from '@mantine/core';
import {
  IconBrandFeedly,
  IconRun,
  IconCalendar,
  IconUserFilled,
  IconSettings,
} from '@tabler/icons-react';

function NavBar() {
  return (
    <AppShell.Navbar p="md">
      <NavLink label="Tableau de bord" defaultOpened childrenOffset={0}>
        <NavLink
          href="#"
          label="Mon flux"
          leftSection={<IconBrandFeedly size="1rem" stroke={1.5} />}
        />
      </NavLink>
      <NavLink label="Entraînement" defaultOpened childrenOffset={0}>
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
      <NavLink label="Profil" defaultOpened childrenOffset={0}>
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
    </AppShell.Navbar>
  );
}

export default NavBar;
