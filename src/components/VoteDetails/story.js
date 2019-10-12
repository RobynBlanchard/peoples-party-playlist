import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import VoteDetails from '.';
import plusImg from '../../../static/img/white-minus.svg'
import minusImg from '../../../static/img/white-plus.svg'

const Background = styled.div`
  background-color: black;
`;

const props = {
  plusImg,
  minusImg,
  votes: 5
}

storiesOf('Vote details', module).add('Vote details', () => <Background><VoteDetails {...props} /></Background>);
