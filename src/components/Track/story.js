import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import Track from '.';

const Background = styled.div`
  background-image: linear-gradient(to right bottom,#212121,#424242);
`;

const props = {
  name: 'The Real Slim Shady',
  artist: 'Eminem',
  children: (
    <div>
      <p>+</p>
    </div>
  ),
  isLocked: false,
  shouldFocus: false
};

storiesOf('Track Component', module).add('Track not selected', () => (
  <Background>
    <Track {...props} />
  </Background>
));
