import React from 'react';

import { storiesOf } from '@storybook/react';
import Track from '.';


const props = {
  name: 'The Real Slim Shady',
  artist: 'Eminem',
  children: <div><p>+</p></div>,
  isLocked: false,
  shouldFocus: false
}

storiesOf('Track Component', module).add(
  'Track not selected',
  () => (
    <Track {...props} />
  )
);