import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import SearchBar from '.';

const Background = styled.div`
  background-color: black;
`;

// TODO: get search icon in story

storiesOf('Search Bar', module).add('Search Bar', () => <SearchBar />);
