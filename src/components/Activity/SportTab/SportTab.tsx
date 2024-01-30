import { Button, Tooltip } from '@mantine/core';
import {
  IconBike,
  IconMountain,
  IconRun,
  IconSwimming,
  IconTrekking,
} from '@tabler/icons-react';

function SportTab() {
  return (
    <>
      <Button.Group>
        <Button color="button.4" variant="outline" size="compact-sm" px={'lg'}>
          Tout
        </Button>

        <Button color="button.4" variant="outline" size="compact-sm" px={'lg'}>
          <Tooltip
            label="Running"
            position="bottom"
            offset={5}
            openDelay={300}
            closeDelay={150}
            transitionProps={{ transition: 'slide-up', duration: 200 }}
            withArrow
          >
            <IconRun size={'1.3rem'} />
          </Tooltip>
        </Button>

        <Button color="button.4" variant="outline" size="compact-sm" px={'lg'}>
          <Tooltip
            label="Trail"
            position="bottom"
            offset={5}
            openDelay={300}
            closeDelay={150}
            transitionProps={{ transition: 'slide-up', duration: 200 }}
            withArrow
          >
            <IconMountain size={'1.3rem'} />
          </Tooltip>
        </Button>

        <Button color="button.4" variant="outline" size="compact-sm" px={'lg'}>
          <Tooltip
            label="Vélo"
            position="bottom"
            offset={5}
            openDelay={300}
            closeDelay={150}
            transitionProps={{ transition: 'slide-up', duration: 200 }}
            withArrow
          >
            <IconBike size={'1.3rem'} />
          </Tooltip>
        </Button>

        <Button color="button.4" variant="outline" size="compact-sm" px={'lg'}>
          <Tooltip
            label="Natation"
            position="bottom"
            offset={5}
            openDelay={300}
            closeDelay={150}
            transitionProps={{ transition: 'slide-up', duration: 200 }}
            withArrow
          >
            <IconSwimming size={'1.3rem'} />
          </Tooltip>
        </Button>

        <Button color="button.4" variant="outline" size="compact-sm" px={'lg'}>
          <Tooltip
            label="Randonnée"
            position="bottom"
            offset={5}
            openDelay={300}
            closeDelay={150}
            transitionProps={{ transition: 'slide-up', duration: 200 }}
            withArrow
          >
            <IconTrekking size={'1.3rem'} />
          </Tooltip>
        </Button>
      </Button.Group>
    </>
  );
}

export default SportTab;
