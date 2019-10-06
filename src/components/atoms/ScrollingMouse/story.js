import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import Mouse from '.';

const Background = styled.div`
  background-color: black;
`

storiesOf('Scrolling mouse', module).add('Mouse', () => (
  <Background>
    <Mouse />
  </Background>
));
