import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import LoadingIndicator from '.';

const Background = styled.div`
  background-color: black;
`;

storiesOf('Page loading indicator', module).add(
  'Page Loading Indicator',
  () => (
    <Background>
      <LoadingIndicator />
    </Background>
  )
);
