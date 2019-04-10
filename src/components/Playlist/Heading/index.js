// TODO pass l=playlist uriu as prop to play button
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: row;
`;

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const Icon = styled.img`
  height: 40px;
  width: 40px;
  padding: 16px;
`;

const Heading = ({ text, playing, playAction, pauseAction }) => {
  const handleClick = () => {
    playing ? pauseAction() : playAction();
  };

  return (
    <Container>
      <Button onClick={() => handleClick()}>
        <Icon src={`images/${playing ? 'pause' : 'play'}-circle-regular.svg`} />
      </Button>
      <h2>Playlist</h2>{' '}
    </Container>
  );
};

export default Heading;
