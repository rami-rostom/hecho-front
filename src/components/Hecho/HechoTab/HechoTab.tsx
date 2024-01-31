import { useState } from 'react';

import { SegmentedControl } from '@mantine/core';

function HechoTab() {
  const [value, setValue] = useState('all');

  return (
    <>
      <SegmentedControl
        color="button.4"
        size="xs"
        radius="md"
        value={value}
        onChange={setValue}
        data={[
          { label: 'Tout', value: 'all' },
          { label: 'Hecho', value: 'hecho' },
          { label: 'No hecho', value: 'no-hecho' },
        ]}
      />
    </>
  );
}

export default HechoTab;
