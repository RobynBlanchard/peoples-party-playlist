import React from 'react';

import { storiesOf } from '@storybook/react';
import ContentBlock from '.';
import image from '../../../static/img/disc.svg';

const props = {
  image,
  text: 'The ultimate party playlist'
};

storiesOf('Rotating Card', module).add('Card', () => (
  <ContentBlock {...props} />
));
