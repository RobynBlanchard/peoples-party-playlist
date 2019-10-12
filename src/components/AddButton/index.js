import React from 'react';
import styled from 'styled-components';
import { DefaultButton } from '../../globalStyles';

const Button = styled(DefaultButton)`
  font-size: 24px;
  height: 20px;

  & > p {
    line-height: 0;
    padding: 0;
    margin: 0;
  }

  &:active > p {
    transform: scale(0.8);
  }

  &:after > p {
    transform: scale(1);
  }
`;

const AddButton = ({ handleClick, uri, name, artist }) => {
  return (
    <Button onClick={() => handleClick(uri, name, artist)}>
      <p> + </p>
    </Button>
  );
};

export default AddButton;
